from django.utils import timezone
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, \
    get_object_or_404
from core.models import Product, Order, OrderProduct, Category, SubCategory, DeliveryMan, Payment, Refund, Client,\
    AdditionalItem
from .serializers import ProductSerializer, OrderProductSerializer, OrderSerializer, SubCategorySerializer, \
    CategorySerializer, RefundSerializer, AdditionalItemSerializer
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
from django.utils import timezone
import datetime
from datetime import timedelta


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


class RefundViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Category instances.
    """
    serializer_class = RefundSerializer
    queryset = Refund.objects.all()


class AdditionalItemViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Category instances.
    """
    serializer_class = AdditionalItemSerializer
    queryset = AdditionalItem.objects.all()


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
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=20))


@api_view()
@login_required()
def payment(request, pk, cpk):
    order = Order.objects.get(pk=pk)
    if order.ordered:
        return Response({'message': 'this order is already ordered'})
    else:
        # TODO :payment = Payment() , update to post class
        client = Client.objects.get(user=request.user)
        if client.amount >= order.total_price:
            client.amount -= order.total_price
            client.save()
            Payment.objects.create(user=request.user, payment_type='S', amount=order.total_price,
                                   payment_date=timezone.now())
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
                # delete
            if not order.ordered:
                order.ordered = True
                order.status = 'Q'
                order.save()
                return Response({'message': 'the order has been put in the queue'})
        else:
            return Response({'message': "you don't have enough money"})


@api_view()
@login_required()
def total(request):
    # ToDo fix that count more than one item in orders
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


class RefundView(APIView):

    @staticmethod
    def post(request, *args, **kwargs):
        option = request.data.get('option', None)
        pk = request.data.get('pk', None)
        if pk is not None:
            order_qs = Order.objects.filter(pk=pk)
            if order_qs.exists() and order_qs[0].ordered:
                order = order_qs[0]
                if option == "request":
                    if not order.refund_requested:
                        reason = request.data.get('reason', None)
                        Refund.objects.create(reason=reason, accepted=False, in_queue=True, order=order)
                        order.refund_requested = True
                        order.save()
                        return Response({'message': 'all good'})
                    else:
                        return Response({'error': 'refund is already requested'})
                if option == "grant":
                    if order.refund_requested and not order.refund_granted:
                        order.refund_granted = True
                        refund_qs = Refund.objects.filter(order=order)
                        refund = refund_qs[0]
                        refund.accepted = True
                        refund.in_queue = False
                        refund.save()
                        order.save()
                        return Response({'message': 'all good refund granted'})
                    else:
                        return Response({'error': 'refund is already granted or not requested on this order'})
                if option == "deny":
                    if order.refund_requested and not order.refund_granted:
                        refund_qs = Refund.objects.filter(order=order)
                        if refund_qs.exists():
                            if not refund_qs[0].accepted and refund_qs[0].in_queue:
                                refund = refund_qs[0]
                                refund.accepted = False
                                refund.in_queue = False
                                refund.save()
                                return Response({'message': 'all good refund denied'})
                            else:
                                return Response({'error': 'refund is already denied'+str(refund_qs[0].accepted)+ str(refund_qs[0].in_queue)})
                        else:
                            return Response({'error': 'refund not found'})

                    else:
                        return Response(
                            {'error': 'refund is granted and cannot be denied or not requested on this order'})
            else:
                return Response({'error': 'order does not found or not ordered'})
        else:
            return Response({'error': 'please enter a pk'})


class OrderView(APIView):

    @staticmethod
    def post(request, *args, **kwargs):
        start_date = request.data.get('star_date', None)
        end_date = request.data.get('end_date', None)
        ordered = request.data.get('ordered', None)
        if start_date is not None and end_date is not None and ordered is not None:
            order = Order.objects.filter(ordered_date__range=[start_date, end_date], ordered=ordered)
            serializer = OrderSerializer(order, many=True)
            return Response(serializer.data)
        else:
            if ordered is None:
                order = Order.objects.filter(ordered_date__range=[start_date, end_date])
                serializer = OrderSerializer(order, many=True)
                return Response(serializer.data)
            else:
                if end_date is None:
                    order = Order.objects.filter(ordered_date=start_date)
                    serializer = OrderSerializer(order, many=True)
                    return Response(serializer.data)
                else:
                    return Response({'error': 'missing argument'})


class ProfitView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        star_date = request.data.get('star_date')
        end_date = request.data.get('end_date')
        orders = Order.objects.filter(ordered_date__range=[star_date, end_date], ordered=True)
        profit = 0
        for order in orders:
            profit += order.total_price

        return Response({"profit": profit})


# merged_dict = {key: value for (key, value) in (dictA.items() + dictB.items())}

class OrderGraph(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        time_range = int(request.data.get('range'))
        star_date = datetime.datetime.strptime(request.data.get('star_date'), '%Y-%m-%d')
        by = request.data.get('by')
        # counter = {i: i for (i,order) in (range(time_range)+)}
        counter = {}
        for i in range(time_range):
            # counter += [Order.objects.filter(ordered_date__range=[star_date, star_date + timedelta(minutes=1439,
            # seconds=59)]).count()]
            # counter.update({str(star_date.date()): Order.objects.filter(
            # ordered_date__range=[star_date, star_date + timedelta(minutes=1439, seconds=59)]).count()})
            if by == 'days':
                counter.update({str(star_date.date()): Order.objects.filter(
                    ordered_date__range=[star_date, star_date + timedelta(minutes=1439, seconds=59)]).count()})
                star_date += timedelta(days=1)
            if by == 'years':
                counter.update({str(star_date.date()): Order.objects.filter(
                    ordered_date__range=[star_date, star_date + timedelta(minutes=1439, seconds=59, days=365)]).count()})
                star_date += timedelta(days=365)
            if by == 'months':
                counter.update({str(star_date.date()): Order.objects.filter(
                    ordered_date__range=[star_date, star_date + timedelta(minutes=1439, seconds=59, days=30)]).count()})
                star_date += timedelta(days=30)
        # res = {i: val for (i, val) in (range(time_range), counter)}
        return Response(counter)
