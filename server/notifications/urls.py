from django.urls import path, include

from .views import (
    NotificationList,
    NotificationDelete
)

urlpatterns = [
    path('',views.home,name='blog-home'),
    path('list/', NotificationList.as_view(), name="Notification-list"),
    path('delete/<str:notification_pk>/', NotificationDelete.as_view(), name="Notification-delete")
]
