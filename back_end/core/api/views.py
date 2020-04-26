from django.utils import timezone
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, \
    get_object_or_404
from core.models import Product, Order, OrderProduct, Category, SubCategory
from .serializers import ProductSerializer, OrderProductSerializer, OrderSerializer, SubCategorySerializer, \
    CategorySerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import AllowAny


class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product instances.
    """
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class OrderProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing OrderProduct instances.
    """
    serializer_class = OrderProductSerializer
    queryset = OrderProduct.objects.all()


class OrderViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing  Order instances.
    """
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class SubCategoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing SubCategory instances.
    """
    serializer_class = SubCategorySerializer
    queryset = SubCategory.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Category instances.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })


@api_view()
@login_required
def add_to_cart(request, slug):
    # find the product
    product = get_object_or_404(Product, slug=slug)
    order_product, created = OrderProduct.objects.get_or_create(
        product=product, user=request.user, ordered=False)
    # find the orders of current user that has not benn ordered (payed)
    orders = Order.objects.filter(user=request.user, ordered=False)

    if orders.exists():
        order = orders[0]
        # check product already exist in order product increase quantity
        if order.products.filter(product__slug=product.slug).exists():
            order_product.quantity += 1
            order_product.save()
        else:
            order.products.add(order_product)
    else:
        order = Order.objects.create(user=request.user, ordered_date=timezone.now())
        order.products.add(order_product)
    return Response(
        {'message': 'product ' + product.title + ' has been added to ' + request.user.username + ' cart successfully'})


@api_view()
@login_required
def remove_from_cart(request, slug):
    product = get_object_or_404(Product, slug=slug)
    order_qs = Order.objects.filter(
        user=request.user,
        ordered=False
    )
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.products.filter(product__slug=product.slug).exists():
            order_product = OrderProduct.objects.filter(
                product=product,
                user=request.user,
                ordered=False
            )[0]
            order.products.remove(order_product)
            order_product.delete()
            return Response({'message': 'This item was removed from your cart.'})
        else:
            return Response({'message': 'This item was not in your cart'})
    else:
        return Response({'message': 'You do not have an active order'})


@api_view()
@login_required
def cart_item_count(request):
    user = request.user
    if user.is_authenticated:
        qs = Order.objects.filter(user=user, ordered=False)
        if qs.exists():
            return Response({'message': qs[0].products.count()})


@api_view()
def cart_item_count(request):
    user = request.user
    if user.is_authenticated:
        qs = Order.objects.filter(user=user, ordered=False)
        if qs.exists():
            return Response({'message': qs[0].products.count()})
        else:
            return Response({'message': 'your cart is empty'})


@api_view()
@login_required()
def order_summary(request):
    order = Order.objects.get(user=request.user, ordered=False)

    serializer = OrderProductSerializer(order.products,many=True)
    serializer2 = OrderSerializer(order)

    return Response()
