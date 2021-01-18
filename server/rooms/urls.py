from django.urls import path, include

from .views import (
    RoomList,
    RoomCreate,
    RoomUpdate,
    RoomDelete,
    RoomDetails,
    RoomMemberList,
    UserRoomList,
    UserPendingRequestRoomList,
    RoomAddUser,
    RoomRemoveUser,
    PendingRequestList,
    PendingRequestCreate,
    PendingRequestDelete,
    RoomCheckCR
)

urlpatterns = [
    path('<str:department_pk>/list/', RoomList.as_view(), name="room-list"),
    path('user_room_list/', UserRoomList.as_view(), name="user-room-list"),
    path('user_pending_request_room_list/', UserPendingRequestRoomList.as_view(), name="user-pending-request-room-list"),
    path('create/', RoomCreate.as_view(), name="room-create"),
    path('delete/<str:room_pk>/', RoomDelete.as_view(), name="room-delete"),
    path('update/<str:room_pk>/', RoomUpdate.as_view(), name="room-update"),

    path('pending_requests/<str:room_pk>/list/', PendingRequestList.as_view(), name="room-pending-request-list"),
    path('pending_requests/<str:room_pk>/create/', PendingRequestCreate.as_view(), name="room-pending-request-create"),
    path('pending_requests/<str:room_pk>/delete/<str:pending_request_pk>/', PendingRequestDelete.as_view(), name="room-pending-request-delete"),

    path('sections/', include('sections.urls'))
]
