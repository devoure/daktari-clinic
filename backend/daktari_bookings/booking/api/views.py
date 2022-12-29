from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from booking.models import Booking, Schedule

from .serializers import BookingSerializer, ScheduleSerializer

@api_view(['GET'])
def booking_list(request):
    bookings = Booking.objects.all()
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def booking_detail(request, pk):
    booking = Booking.objects.get(id=pk)
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def booking_delete(request, pk):
    booking = Booking.objects.get(id=pk)
    booking.delete()
    return Response("The booking has been deleted")

@api_view(['POST'])
def booking_create(request):
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def user_bookings_list(request, pk):
    user_bookings = Booking.objects.filter(patient_name=pk, completed=False)
    serializer = BookingSerializer(user_bookings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def doctor_bookings_list(request, pk):
    doc_bookings = Booking.objects.filter(doctor_name=pk, completed=False)
    serializer = BookingSerializer(doc_bookings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def doctor_schedules(request):
    doc_schedules = Schedule.objects.all()
    serializer = ScheduleSerializer((doc_schedules))
    return Response(serializer.data)
@api_view(['POST'])
def schedule_create(request):
    serializer = ScheduleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)




