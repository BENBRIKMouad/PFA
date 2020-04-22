from django.urls import path, include
from .views import ProductList, ProductDetail


urlpatterns = [
    path('', ProductList.as_view()),
    path('<pk>', ProductDetail.as_view())
]