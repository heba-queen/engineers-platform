from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from ..models import Project, Post, Comment, Invitation
from django.core.files.uploadedfile import SimpleUploadedFile
import os

User = get_user_model()
image_path = os.path.join("media", "project_images", "madinah.jpeg")

class FullViewTestCase(APITestCase):
   

    def setUp(self):
        # Create two users
        self.user = User.objects.create_user(
            username="john", email="john@example.com", password="secret123",
            age="30", country="USA", number="1234567890", status="1", speciality="AI"
        )
        self.user2 = User.objects.create_user(
            username="jane", email="jane@example.com", password="secret123",
            age="25", country="UK", number="9999999999", status="2", speciality="ML"
        )
        self.token = Token.objects.create(user=self.user)
        self.auth_header = {"HTTP_AUTHORIZATION": f"Token {self.token.key}"}

        self.project = Project.objects.create(
            name="Test Project", category="Tech", license="MIT",
            description="Test description", author=self.user
        )

        self.post = Post.objects.create(
            description="Test post", category="AI",
            author=self.user
        )
        
        
    def test_signup(self):
        url = reverse("signup")
        with open(image_path, "rb") as img:
            image = SimpleUploadedFile("madinah.jpeg", img.read(), content_type="image/jpeg")
        data = {
            "username": "jane@example.com",
            "email": "jane@example.com",
            "password": "secret123",
            "age": "25",
            "country": "UK",
            "number": "8888888888",
            "status": "2",
            "speciality": "ML",
            "image" : image
            
        }
        response = self.client.post(url, data , format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("token", response.data)

    def test_login_success(self):
        response = self.client.post(reverse("login"), {
            "email": "john@example.com",
            "password": "secret123"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)

    def test_profile_view(self):
        
        response = self.client.post(reverse("profile"), data={"id": self.user.id}, content_type="application/json", **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["email"], "john@example.com")

    # def test_add_project(self):
    #     url = reverse("addProject")
    #     with open(image_path, "rb") as img:
    #         image = SimpleUploadedFile("madinah.jpeg", img.read(), content_type="image/jpeg")
    #     data = {
    #         "name": "My Project",
    #         "category": "Tech",
    #         "license": "MIT",
    #         "description": "Great stuff",
    #         "author": self.user.id,
    #         "image1": image,
    #         "image2": image,
    #         "image3": image
    #     }
    #     response = self.client.post(url, data, format='multipart', **self.auth_header)
    #     self.assertEqual(response.status_code, 200)

    def test_add_post_and_comment(self):
        post_url = reverse("addPost")
        post_data = {"description": "New Post", "category": "AI", "author": self.user.id}
        post_response = self.client.post(post_url, post_data, **self.auth_header)
        self.assertEqual(post_response.status_code, 200)

        post_id = post_response.data["id"]
        comment_url = reverse("addComment")
        comment_data = {"description": "Nice post!", "post": post_id, "author": self.user.id}
        comment_response = self.client.post(comment_url, comment_data, **self.auth_header)
        self.assertEqual(comment_response.status_code, 200)

    def test_password_reset_flow(self):
        send_url = reverse("send_reset_email")
        reset_url = reverse("reset_password")

        # Step 1: Request reset
        res = self.client.post(send_url, {"email": "john@example.com"})
        self.assertEqual(res.status_code, 200)
        user = User.objects.get(email="john@example.com")
        token = user.reset_token

        # Step 2: Reset password
        res2 = self.client.post(reset_url, {"token": token, "new_password": "newpass123"})
        self.assertEqual(res2.status_code, 200)

        # Step 3: Try logging in with new password
        res3 = self.client.post(reverse("login"), {
            "email": "john@example.com", "password": "newpass123"
        })
        self.assertEqual(res3.status_code, 200)

    def test_change_password(self):
        url = reverse("change_password")
        res = self.client.post(url, {"id": self.user.id, "new_password": "changed123"}, **self.auth_header)
        self.assertEqual(res.status_code, 200)

        # Login again with new password
        res2 = self.client.post(reverse("login"), {"email": "john@example.com", "password": "changed123"})
        self.assertEqual(res2.status_code, 200)


    

    def test_edit_project(self):
        url = reverse("editProject")
        data = {
            "id": self.project.id,
            "name": "Updated Project",
            "category": "Science",
            "license": "GPL",
            "description": "Updated description"
        }
        response = self.client.post(url, data, **self.auth_header)
        self.assertEqual(response.status_code, 200)

    def test_delete_project(self):
        url = reverse("deleteProject")
        data = {"id": self.project.id}
        response = self.client.post(url, data, **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Project.objects.filter(id=self.project.id).exists())

    def test_update_post(self):
        url = reverse("updatePost")
        data = {
            "id": self.post.id,
            "description": "Updated post description",
            "category": "Tech"
        }
        response = self.client.post(url, data, **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.post.refresh_from_db()
        self.assertEqual(self.post.description, "Updated post description")

    def test_delete_post(self):
        url = reverse("deletePost")
        data = {"id": self.post.id}
        response = self.client.post(url, data, **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Post.objects.filter(id=self.post.id).exists())

    def test_post_details(self):
        url = reverse("post")
        data = {"id": self.post.id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("description", response.data)

    def test_invite_user_to_project(self):
        url = reverse("invite")
        data = {
            "projectId": self.project.id,
            "userId": self.user.id,
            "userOwner": self.user2.id
        }
        response = self.client.post(url, data, **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(Invitation.objects.filter(user=self.user2).exists())

    def test_get_invitations(self):
        Invitation.objects.create(
            status="1", project=self.project, author=self.user, user=self.user2
        )
        url = reverse("invitations")
        data = {"id": self.user2.id}
        response = self.client.post(url, data, **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) > 0)