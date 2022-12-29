from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .prediction import predict


@api_view(['POST'])
def prediction_create(request):
    data = request.FILES['file']
    response = predict(data)
    return Response(response)


