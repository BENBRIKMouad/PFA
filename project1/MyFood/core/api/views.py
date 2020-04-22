from rest_framework.generics import ListAPIView, RetrieveAPIView
from core.views import Product
from .serializers import ProductSerializers


class ProductList(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers


class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
