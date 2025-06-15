from django.db import models
from django.contrib.auth.models import AbstractUser

STATUS = (("2", "Engineer"), ("1", "Investor"))


# Create your models here.
class CustomUser(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    # username = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200)
    age = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    number = models.CharField(max_length=200)
    status = models.CharField(choices=STATUS, max_length=200, default="0")
    speciality = models.CharField(max_length=200)
    image = models.ImageField(upload_to="user_images/", blank=True, null=True)
    reset_token = models.CharField(max_length=64, blank=True, null=True)

    def __str__(self):
        return self.username


class Project(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    license = models.CharField(max_length=200)
    description = models.TextField()
    image1 = models.ImageField(upload_to="project_images/", blank=True, null=True)
    image2 = models.ImageField(upload_to="project_images/", blank=True, null=True)
    image3 = models.ImageField(upload_to="project_images/", blank=True, null=True)
    author = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="author_projects"
    )

    def __str__(self):
        return self.name


class Post(models.Model):
    description = models.TextField()

    category = models.CharField(max_length=200)

    image = models.ImageField(upload_to="project_images/", blank=True, null=True)

    author = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="author_posts"
    )

    def __str__(self):
        return f"Post {self.id} - {self.category}"


class Comment(models.Model):
    description = models.TextField()

    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="posts_comments"
    )
    
    author = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="author_comments"
    )

    def __str__(self):
        return f"Comment {self.id} on Post {self.post.id}"
    
class Invitation(models.Model):
    status = models.CharField(max_length=200)

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="projects_invitation"
    )
    
    author = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="author_invitation"
    )
    
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="user_invitation" , default="2"
    )

    def __str__(self):
        return f"Invitation {self.id} to {self.user.username}"