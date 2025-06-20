from django.contrib import admin

from django.contrib import admin
from .models import CustomUser, Project, Post, Comment, Invitation
from django.contrib.auth.admin import UserAdmin


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', 'status', 'age', 'country', 'number', 'speciality')
    list_filter = ('status', 'country')
    search_fields = ('username', 'email')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'license', 'author')
    search_fields = ('name', 'category')
    list_filter = ('category',)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'category', 'author')
    search_fields = ('description', 'category')
    list_filter = ('category',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'post', 'author')
    search_fields = ('description',)


@admin.register(Invitation)
class InvitationAdmin(admin.ModelAdmin):
    list_display = ('id', 'status', 'project', 'author', 'user')
    list_filter = ('status',)

