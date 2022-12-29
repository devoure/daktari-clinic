from django.urls import path
from . import views
from .views import booking_detail, booking_list

urlpatterns = [
        path('bookings/', views.booking_list),
        path('bookings/create', views.booking_create),
        path('bookings/delete/<str:pk>', views.booking_delete),
        path('bookings/user/<str:pk>', views.user_bookings_list),
        path('bookings/doctor/<str:pk>', views.doctor_bookings_list),
        path('bookings/<str:pk>', views.booking_detail),
        path('schedules/', views.doctor_schedules),
        path('schedules/create', views.schedule_create)

        ]
