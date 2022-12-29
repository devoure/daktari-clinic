from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer

from base.models import User



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        # Add custom claims
        token['username'] = user.user_name
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
 

@api_view(['GET'])
def getroutes(request):
    routes = [
            '/api/token',
            'api/token/refresh'
            ]
    return Response(routes)

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        res = 'Success'
    else:
        res = serializer.errors

    return Response(res)

@api_view(['GET'])
def getUserDetails(request, pk):
    users = User.objects.get(user_name = pk)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getDoctors(request):
    doctors = User.objects.filter(is_doctor=True)
    serializers = UserSerializer(doctors, many=True)
    return Response(serializers.data)
