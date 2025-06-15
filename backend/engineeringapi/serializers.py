from rest_framework import serializers
from .models import CustomUser , Project , Post , Comment , Invitation

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['id' , 'username' , 'age' , 'email' , 'password' , 'country' , 'number' , 'status' , 'speciality' , 'image']
    
    
    
    
class ProjectSerializer(serializers.ModelSerializer):
    owner = CustomUser()
    class Meta:
        model = Project
        fields = ['id','name' , 'category' , 'license' , 'description' , 'image1' , 'image2' , 'image3' , 'author']
        

    
class PostSerializer(serializers.ModelSerializer):
    owner = CustomUser()
    class Meta:
        model = Post
        fields = ['id', 'category' , 'description' , 'image' , 'author']
        
        
class CommentSerializer(serializers.ModelSerializer):
    owner = CustomUser()
    post = Post()
    class Meta:
        model = Comment
        fields = ['id', 'description' , 'post' , 'author']
        
class InvitationSerializer(serializers.ModelSerializer):
    author = CustomUser()
    project = Project()
    class Meta:
        model = Invitation
        fields = ['id', 'status' , 'project' , 'author' , 'user']
    