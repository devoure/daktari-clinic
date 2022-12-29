from rest_framework import serializers 
from base.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "user_name", "password", "first_name", "is_doctor", "is_patient", "is_active")

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

