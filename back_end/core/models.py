from django.db import models
from django.conf import settings
from django.urls import reverse
from django.template.defaultfilters import slugify
from autoslug import AutoSlugField
from django_countries.fields import CountryField

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
    slug = models.SlugField(blank=True)
    photo = models.ImageField(upload_to="gallery", null=True)
    description = models.TextField(default="No description available for this product")

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):  # new
        self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("core:product", kwargs={'slug': self.slug})

    def get_add_to_cart_url(self):
        return reverse("core:add_to_cart", kwargs={'slug': self.slug})

    def get_remove_from_cart_url(self):
        return reverse("core:remove_from_cart", kwargs={'slug': self.slug})


class OrderProduct(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def get_total_price(self):
        if self.product.discount_price > 0:
            return self.quantity * self.product.discount_price
        else:
            return self.quantity * self.product.price

    def saved_price(self):
        if self.product.discount_price > 0:
            return self.get_total_price() - self.product.price
        else:
            return 0


class Client(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address = models.CharField(max_length=1000)
    tel = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=8)

    def __str__(self):
        return "client " + self.user.username


class ShippingAddress(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    # country = CountryField()
    postal_code = models.CharField(max_length=7)


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    products = models.ManyToManyField(OrderProduct)
    order_date = models.DateTimeField(auto_now_add=True)
    ordered = models.BooleanField(default=False)
    ordered_date = models.DateTimeField(null=True, blank=True)
    shipping_address = models.ForeignKey(ShippingAddress,
                                         on_delete=models.SET_NULL,
                                         blank=True,
                                         null=True)

    def __str__(self):
        return "%s %s" % (self.user.username, self.order_date)

    def total_saved_price(self):
        save = 0
        for p in self.products.all():
            save += p.saved_price()
        return save

    def total_price(self):
        total = 0
        for p in self.products.all():
            total += p.get_total_price()
        return total


class DeliveryMan(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tel = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    available = models.BooleanField()

    def __str__(self):
        return "delivery man " + self.user.username
