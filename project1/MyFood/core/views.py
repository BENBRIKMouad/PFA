from django.shortcuts import render
from .models import Product,Order,OrderProduct
# Create your views here.

def ProductList(request):
    context ={
        'products':Product.objects.all(),
        'count':Product.objects.count,
    }
    return render(request,'core/home-page.html',context)

def ProducDetail(request):
    context ={
        'products':Product.objects.all()
    }
    return render(request,'core/product-page.html',context)

def CheckOut(request):
    context ={
        'products':Product.objects.all()
    }
    return render(request,'core/checkout-page.html',context)
