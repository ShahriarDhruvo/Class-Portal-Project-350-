from django.urls import path, include
from .views import apiOverview

urlpatterns = [
    path('', apiOverview, name="api-overview"),

    path('accounts/', include('accounts.urls')),

    path('rooms/', include('rooms.urls')),

    path('university/', include('universities.urls')),

    path('notifications/', include('notifications.urls'))
    path('details/<str:room_pk>/', RoomDetails.as_view(), name="room-details"),
    path('members/<str:room_pk>/', RoomMemberList.as_view(), name="room-members-list"),
    path('check_CR/<str:room_pk>/', RoomCheckCR.as_view(), name="room-check-CR"),
    path('add/<str:room_pk>/<str:user>/<str:username>/', RoomAddUser.as_view(), name="room-add-user"),
    path('remove/<str:room_pk>/<str:user>/<str:username>/', RoomRemoveUser.as_view(), name="room-remove-user"),
]
