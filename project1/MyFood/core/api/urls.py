from django.urls import path, include
from .views import ProductList, ProductDetail


urlpatterns = [
    path('', ProductList.as_view()),
    path('<slug>', ProductDetail.as_view())
]