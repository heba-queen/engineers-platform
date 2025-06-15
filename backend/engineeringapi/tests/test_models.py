from django.test import TestCase
from ..models import CustomUser, Project

class UserModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="john", email="john@example.com", password="password123",
            age="30", country="USA", number="1234567890", status="1", speciality="Web Dev"
        )

    def test_user_created(self):
        self.assertEqual(self.user.email, "john@example.com")
        self.assertTrue(self.user.check_password("password123"))

class ProjectModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username="a", email="a@a.com", password="1234")
        self.project = Project.objects.create(
            name="Test Project",
            category="Tech",
            license="MIT",
            description="A test project",
            author=self.user
        )

    def test_project_creation(self):
        self.assertEqual(self.project.name, "Test Project")
        self.assertEqual(self.project.author, self.user)
