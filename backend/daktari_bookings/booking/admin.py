from django.contrib import admin
from .models import Booking, Schedule

# Register your models here.

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('doctor_name', 'patient_name', 'scheduled')

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('booking', 'date_time')


