from django.shortcuts import render,get_object_or_404,redirect
from django.http import HttpResponse
from .models import Product,Order,OrderProduct
from django.views import View
from django.views.generic import ListView,DetailView
from .models import *
from django.utils import  timezone
# Create your views here.

class ProductList(ListView):
    model = Product

class ProductDetail(DetailView):
    model = Product


class CheckOut(View):
    def get(self,request):
        context ={
            'products':Product.objects.all()
        }

def AddToCart(request,slug):
    #find the product
    product = get_object_or_404(Product,slug=slug)
    order_product,created= OrderProduct.objects.get_or_create(
        product=product,user=request.user,ordred=False)
    #find the orders of current user that has not benn ordred (payed)
    orders = Order.objects.filter(user=request.user,ordred=False)

    if orders.exists():
        order = orders[0]
        #check product alredy exist in orderproduct increase quantity
        if order.products.filter(product__slug=product.slug).exists():
            order_product.quantity += 1
            order_product.save()
        else:
            order.products.add(order_product)
    else:
        order = Order.objects.create(user = request.user,ordred_date=timezone.now())
        order.products.add(order_product)

    return redirect("core:product",slug=slug)