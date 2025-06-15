from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApiOverview, name='home'),
    path('signup' , views.signup , name='signup'),
    path('login' , views.login , name='login'),
    path('addProject' , views.addProject , name='addProject'),
    path('editProject' , views.editProject , name='editProject'),
    path('profile' , views.profile , name='profile'),
    path('projects' , views.projects , name='projects'),
    path('project/<int:id>' , views.projectDetails , name='projectDetails'),
    path('deleteProject' , views.deleteProject , name='deleteProject'),
    
    
    path('addPost' , views.addPost , name='addPost'),
    path('posts' , views.posts , name='posts'),
    path('post' , views.post , name='post'),
    path('updatePost' , views.updatePost , name='updatePost'),
    path('deletePost' , views.deletePost , name='deletePost'),
    
    path('addComment' , views.addComment , name='addComment'),
    path('deleteComment' , views.deleteComment , name='deleteComment'),
    
    path('invite' , views.invite , name='invite'),
    
    path('invitations' , views.invitations , name='invitations'),
    
    
    
    
    path('updateProfile' , views.updateProfile , name='updateProfile'),
    
    
    path('send-reset-email/', views.send_reset_email , name='send_reset_email'),
    path('reset-password/', views.reset_password , name='reset_password'),
    path('change-password/', views.change_password , name='change_password'),

]

