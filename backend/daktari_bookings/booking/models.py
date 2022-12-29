from django.db import models
from django.utils import timezone

# Create your models here.

class Booking(models.Model):
    doctor_name = models.CharField(max_length=150)
    patient_name = models.CharField(max_length=150)
    scheduled = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    date_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.patient_name

class Schedule(models.Model):
    booking = models.OneToOneField(to=Booking,  on_delete=models.CASCADE, primary_key=True)
    date_time = models.CharField(max_length=150)

    def __str__(self):
        return self.booking.patient_name

