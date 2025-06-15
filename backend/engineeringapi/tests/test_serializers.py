from django.test import TestCase
from ..serializers import UserSerializer
from ..models import CustomUser

class UserSerializerTest(TestCase):
    def test_valid_data(self):
        data = {
            "username": "alice",
            "first_name": "Alice",
            "email": "alice@example.com",
            "password": "secret123",
            "age": "25",
            "country": "UK",
            "number": "9999999999",
            "status": "2",
            "speciality": "Backend",
        }
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid())
