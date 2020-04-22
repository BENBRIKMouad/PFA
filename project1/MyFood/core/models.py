from django.db import models
from django.conf import settings
from django.urls import reverse


# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=100)

    # parent_category = models.ForeignKey("self",blank=True,null=True,on_delete=models.CASCADE)
    def __str__(self):
        return self.title


class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


BADGES_CHOICES = (
    ('P', 'primary'),
    ('S', 'success'),
    ('D', 'danger'),
    ('W', 'warning'),
)


class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    discount_price = models.FloatField(blank=True, null=True)
    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, blank=True, null=True, on_delete=models.CASCADE)
    badge = models.CharField(choices=BADGES_CHOICES, blank=True, null=True, max_length=1)
    badge_tag = models.CharField(blank=True, null=True, max_length=30)
    slug = models.SlugField()
    photo = models.ImageField(upload_to="gallery",null=True)
    description = models.TextField(default="No description available for this product")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("core:product", kwargs={'slug': self.slug})

    def get_add_to_cart_url(self):
        return reverse("core:add_to_cart", kwargs={'slug': self.slug})

    def get_remove_from_cart_url(self):
        return reverse("core:remove_from_cart", kwargs={'slug': self.slug})


class OrderProduct(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ordred = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    products = models.ManyToManyField(OrderProduct)
    order_date = models.DateTimeField(auto_now_add=True)
    ordred = models.BooleanField(default=False)
    ordred_date = models.DateTimeField()
