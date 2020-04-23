from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView
from core.models import Product,Order,OrderProduct,Category,SubCategory
from .serializers import ProductSerializer, OrderProductSerializer, OrderSerializer, SubCategorySerializer, CategorySerializer
from rest_framework import viewsets


class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product instances.
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class OrderProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product instances.
    """
    serializer_class = OrderProductSerializer
    queryset = OrderProduct.objects.all()


class OrderViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product instances.
    """
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class SubCategoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product instances.
    """
    serializer_class = SubCategorySerializer
    queryset = SubCategory.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product instances.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
# Product
# class ProductList(ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializers
#
#
# class ProductDetail(RetrieveAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializers
#
#
# class ProductCreate(CreateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializers
#
#
# class ProductUpdate(UpdateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializers
#
#
# class ProductDelete(DestroyAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializers
