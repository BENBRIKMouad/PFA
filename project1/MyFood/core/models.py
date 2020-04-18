from django.db import models
from django.conf import settings
# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    def __str__(self):
        return self.title

class OrderProduct(models.Model):
    item = models.ForeignKey(Product,on_delete=models.CASCADE)
    def __str__(self):
        return self.title


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    ordred = models.BooleanField(default=False)
    ordred_date = models.DateTimeField()
    def __str__(self):
        return self.title
