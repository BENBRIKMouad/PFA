from django.utils import timezone
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, \
    get_object_or_404
from core.models import Product, Order, OrderProduct, Category, SubCategory, DeliveryMan, Payment
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
from django.shortcuts import redirect
import random
import string


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
def remove_single_product_from_cart(request, slug):
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
            if order_product.quantity == 1:
                return redirect("core:api:remove_from_cart", slug=slug)
            else:
                order_product.quantity -= 1
            order_product.save()
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

    serializer = OrderProductSerializer(order.products, many=True)
    serializer2 = OrderSerializer(order)

    return Response()


def get_ref_code():
    return ''.join(random.choices(string.ascii_lowercase+string.digits, k=20))


@api_view()
@login_required()
def payment(request, pk):
    order = Order.objects.get(pk=pk)
    if order.ordered:
        return Response({'message': 'this order is already ordered'})
    else:
        # TODO :payment = Payment()

        mans = DeliveryMan.objects.order_by('orders_delivered')
        for man in mans:
            if man.available:
                man.orders.add(order)
                man.orders_delivered += 1
                man.save()
                order.ordered = True
                order.status = 'W'
                order_products = Order.objects.filter(pk=pk)[0].products.all()
                for order_product in order_products:
                    order_product.ordered = True
                    order_product.save()
                order.ref_code = get_ref_code()
                order.save()
                return Response({'message': 'the order has been assigned'})
        if not order.ordered:
            order.ordered = True
            order.status = 'Q'
            order.save()
            return Response({'message': 'the order has been put in the queue'})


@api_view()
@login_required()
def total(request):
    order_products = OrderProduct.objects.filter(ordered=True)
    orders = [product.product.title for product in OrderProduct.objects.filter(ordered=True)]
    total_money = 0
    total_quantity: int = 0
    for order_product in order_products:
        total_money += order_product.quantity * order_product.product.price
        total_quantity += order_product.quantity
        # {'money': total_money, 'quantity': total_quantity}
    return Response({'money': total_money, 'quantity': total_quantity, 'product': orders})


@api_view(['GET', 'POST'])
def request_refund(request):
    if request.method == 'POST':
        f = request.data()

        return Response({"message": "Got some data!", "data": f})
    return Response({"message": "Hello, world!"})


