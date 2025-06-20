from django.shortcuts import render
from .serializers import (
    UserSerializer,
    ProjectSerializer,
    PostSerializer,
    CommentSerializer,
    InvitationSerializer,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser, Project, Post, Comment, Invitation
from engineeringapi import serializers
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.utils.crypto import get_random_string

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.core.cache import cache
from rest_framework.exceptions import ValidationError

import logging
logger = logging.getLogger(__name__)

# class UserView(APIView)
# # Create your views here.
# def signup(request) :
#     if request.method == "POST" :
#         serializer = UserSerializer(data = request.data)
#         if serializer.is_valid(raise_exception=True) :
#             serializer.save()
#             return Response(serializer.data)


@api_view(["GET"])
def ApiOverview(request):
    api_urls = {
        "all": "/",
        "Add": "/create",
        "Update": "/update/pk",
        "Delete": "/item/pk/delete",
        "Search by Category": "/?category=category_name",
        "Search by Subcategory": "/?subcategory=category_name",
    }

    return Response(api_urls)


@api_view(["POST"])
def signup(request):
    email = request.data["email"]
    raw_password = request.data["password"]
    hashed_password = make_password(raw_password)

    try:
        if CustomUser.objects.filter(email=email).exists():
            raise ValidationError("A user with this email already exists.")

        user_serializer = UserSerializer(
            data={
                "username": email,
                "first_name": request.data["username"],
                "email": email,
                "password": hashed_password,
                "age": request.data["age"],
                "country": request.data["country"],
                "number": request.data["number"],
                "status": request.data["status"],
                "speciality": request.data["speciality"],
                "image": request.data["image"],
            }
        )

        if user_serializer.is_valid():
            logger.debug("user validated.")
            user = user_serializer.save()

            token, _ = Token.objects.get_or_create(user=user)
            logger.debug("loggen user token")
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(e)
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):

    email = request.data["email"]
    raw_password = request.data["password"]

    try:
        user_obj = CustomUser.objects.get(email=email)
        username = user_obj.username

        user = authenticate(username=username, password=raw_password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            user_serialized = UserSerializer(user)
            return Response({'token': token.key, 'user': user_serialized.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addProject(request):

    item = ProjectSerializer(data=request.data)
    try :
        if item.is_valid() :
            item.save()
            cache.delete("all_projects")
            return Response(item.data)
    
    except Exception as e:
        return Response( {"error": str(e)} ,status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def editProject(request):


    id = request.data["id"]
    project = Project.objects.get(id=id)

    if "name" in request.data:
        project.name = request.data["name"]

    if "category" in request.data:
        project.category = request.data["category"]

    if "license" in request.data:
        project.license = request.data["license"]

    if "description" in request.data:
        project.description = request.data["description"]

    if "image1" in request.data:
        project.image1 = request.data["image1"]

    if "image2" in request.data:
        project.image2 = request.data["image2"]

    if "image3" in request.data:
        project.image3 = request.data["image3"]

    project.save()
    cache.delete("all_projects")

    serializer = ProjectSerializer(project)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def profile(request):


    if CustomUser.objects.filter(**request.data).exists():
        data = CustomUser.objects.filter(id=request.data["id"]).values().first()

        return Response(data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def projects(request):


    try:
        if "id" not in request.data:
            
            cached = cache.get("all_projects")
            if cached:
                return Response(cached)

            projects = Project.objects.all()
            serializer = ProjectSerializer(projects, many=True)
            for project in serializer.data:

                author = (
                    CustomUser.objects.filter(id=project["author"]).values().first()
                )
                logger.debug(author)
                project["author"] = author
            cache.set("all_projects", serializer.data, timeout=300)

        else:
            projects = Project.objects.filter(author=request.data["id"]).all()
            serializer = ProjectSerializer(projects, many=True)
            for project in serializer.data:

                author = (
                    CustomUser.objects.filter(id=project["author"]).values().first()
                )

                project["author"] = author

        return Response(serializer.data)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def projectDetails(request, id):
    user_id = request.data["userId"]

    invite = Invitation.objects.filter(author=user_id, project=id).values()

    project = Project.objects.filter(id=id).values().first()

    logger.debug("number of invitations" + str(len(invite)))
    project["invite"] = len(invite)
    # serializer = ProjectSerializer(project)
    return Response(project)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addPost(request):

    item = PostSerializer(data=request.data)

    if item.is_valid():
        item.save()
        cache.delete("all_posts")
        return Response(item.data)
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addComment(request):

    item = CommentSerializer(data=request.data)

    if item.is_valid():
        item.save()
        return Response(item.data)
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def deleteComment(request):

    try:

        comment_id = request.data.get("id")
        if not comment_id:
            return Response(
                {"error": "Comment ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        comment = Comment.objects.get(id=comment_id)

        comment.delete()

        return Response(
            {"message": "Comment deleted successfully"}, status=status.HTTP_200_OK
        )

    except Comment.DoesNotExist:
        return Response(
            {"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def posts(request):
    try:
        if request.data["userId"] == 0:
            cached_posts = cache.get("all_posts")
            if cached_posts:
                logger.info("loaded from cache")
                return Response(cached_posts)
            posts = Post.objects.all()
            serializer = PostSerializer(posts, many=True)
            for post in serializer.data:

                author = CustomUser.objects.filter(id=post["author"]).values().first()
                post["author"] = author

                comments = Comment.objects.filter(post=post["id"]).all()

                serializerComment = CommentSerializer(comments, many=True)
                post["comments"] = len(serializerComment.data)

        else:

            posts = Post.objects.filter(author=request.data["userId"]).all()
            serializer = PostSerializer(posts, many=True)

            for post in serializer.data:

                author = CustomUser.objects.filter(id=post["author"]).values().first()

                post["author"] = author

                comments = Comment.objects.filter(post=post["id"]).all()

                serializerComment = CommentSerializer(comments, many=True)
                post["comments"] = len(serializerComment.data)

        return Response(serializer.data)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def post(request):

    try:
        post_id = request.data["id"]

        post = Post.objects.filter(id=post_id).values().first()
        author = CustomUser.objects.filter(id=post["author_id"]).values().first()

        comments = Comment.objects.filter(post=post_id).all()

        serializer = CommentSerializer(comments, many=True)

        for comment in serializer.data:

            authorComment = (
                CustomUser.objects.filter(id=comment["author"]).values().first()
            )

            comment["author"] = authorComment

        post["author_id"] = author
        post["comments"] = serializer.data

        return Response(post)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    try:
        user_id = request.data["id"]
        user = CustomUser.objects.get(id=user_id)

        if "username" in request.data:
            user.username = request.data["username"]

        if "age" in request.data:
            user.age = request.data["age"]

        if "email" in request.data:
            if (
                CustomUser.objects.filter(email=request.data["email"]).exists()
                and request.data["email"] != user.email
            ):
                print("already exits")
                return Response(
                    {"error": "email taken"}, status=status.HTTP_406_NOT_ACCEPTABLE
                )

            else:
                user.email = request.data["email"]

        if "country" in request.data:
            user.country = request.data["country"]

        if "number" in request.data:
            user.number = request.data["number"]

        if "speciality" in request.data:
            user.speciality = request.data["speciality"]

        if "image" in request.data:
            user.image = request.data["image"]
        user.save()

        # Return the updated user data
        serializer = UserSerializer(user)
        return Response(serializer.data)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updatePost(request):
    
    try:
        id = request.data["id"]
        post = Post.objects.get(id=id)

        if "description" in request.data:
            post.description = request.data["description"]

        if "category" in request.data:
            post.category = request.data["category"]

        if "image" in request.data:

            post.image = request.data["image"]

        post.save()
        logger.info("Post Updated")
        serializer = PostSerializer(post)
        return Response(serializer.data)

    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error("Error " + str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def deletePost(request):
    try:

        post_id = request.data.get("id")
        if not post_id:
            return Response(
                {"error": "Post ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        post = Post.objects.get(id=post_id)

        if post.image:
            post.image.delete(save=False)

        post.delete()
        cache.delete("all_posts")

        return Response(
            {"message": "Post deleted successfully"}, status=status.HTTP_200_OK
        )

    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error("Error " + str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def deleteProject(request):
    try:

        id = request.data.get("id")
        if not id:
            return Response(
                {"error": "Project ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        project = Project.objects.get(id=id)

        if project.image1:
            project.image1.delete(save=False)
        if project.image2:
            project.image2.delete(save=False)
        if project.image3:
            project.image3.delete(save=False)

        project.delete()
        cache.delete("all_projects")

        return Response(
            {"message": "Project deleted successfully"}, status=status.HTTP_200_OK
        )

    except Project.DoesNotExist:
        return Response(
            {"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error("Error " + str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def invite(request):


    item = InvitationSerializer(
        data={
            "status": "1",
            "project": request.data.get("projectId"),
            "author": request.data.get("userId"),
            "user": request.data.get("userOwner"),
        }
    )

    if item.is_valid():
        item.save()
        return Response(item.data)
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def invitations(request):

    try:
        id = request.data["id"]

        invitaions = Invitation.objects.filter(user=id).all()
        serializer = InvitationSerializer(invitaions, many=True)
 

        for ivn in serializer.data:
            authorInv = CustomUser.objects.filter(id=ivn["author"]).values().first()

            ivn["author"] = authorInv
            projectInv = Project.objects.filter(id=ivn["project"]).values().first()
            ivn["project"] = projectInv

        return Response(serializer.data)

    except Exception as e:
        logger.error("Error " + str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["POST"])
def send_reset_email(request):
    email = request.data.get("email")
    try:
        user = CustomUser.objects.get(email=email)
        token = get_random_string(length=32)

        user.reset_token = token
        user.save()

        reset_link = f"http://localhost:5173/reset-password/{token}"

        send_mail(
            'Password Reset',
            f'Click the following link to reset your password: {reset_link}',
            'heba611mansour@gmail.com',
            [email],
            fail_silently=False,
        )

        return Response({'message': 'Reset link sent to email'}, status=200)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    
    
    
@api_view(["POST"])
def reset_password(request):
    token = request.data.get("token")
    new_password = request.data.get("new_password")

    try:
        user = CustomUser.objects.get(reset_token=token)
        user.set_password(new_password)
        user.reset_token = None 
        user.save()

        return Response({'message': 'Password reset successful'}, status=200)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Invalid or expired token'}, status=400)
    
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    try:
        user = CustomUser.objects.get(id=request.data["id"])
        user.set_password(request.data["new_password"])
        user.save()
        return Response({"message": "Password updated"}, status=200)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    
    