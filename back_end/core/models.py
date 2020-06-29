
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

STATUS_CHOICES = (
    ('ND', 'not delivered'),
    ('D', 'delivered'),
    ('Q', 'in queue'),
    ('W', 'in the way'),
)

PAYMENTS_CHOICES = (
    ('C', 'Credit card'),
    ('P', 'PayPal'),
    ('S', 'site curency')
)


class AdditionalItem(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()

    def __str__(self):
        return self.title

    @property
    def add_i_price(self):
        return self.price


class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    discount_price = models.FloatField(blank=True, null=True)
    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, blank=True, null=True, on_delete=models.CASCADE)
    # badge = models.CharField(choices=BADGES_CHOICES, blank=True, null=True, max_length=1)
    # badge_tag = models.CharField(blank=True, null=True, max_length=30)
    slug = models.SlugField(blank=True)
    photo = models.ImageField(upload_to="gallery",default="gallery/food.png")
    description = models.TextField(default="No description available for this product")
    additional_items = models.ManyToManyField(AdditionalItem, blank=True, null=True)

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


class ProductClient(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    additional_items = models.ManyToManyField(AdditionalItem, blank=True, null=True)

    def __str__(self):
        add = ", ".join(additional_item.title for additional_item in self.additional_items.all())
        return self.product.title + " with "+add


class OrderProduct(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    additional_items = models.ManyToManyField(AdditionalItem, blank=True, null=True)
    quantity = models.IntegerField(default=1)

    @property
    def get_total_price(self):
        a = 0
        if self.additional_items.exists():
            for p in self.additional_items.all():
                a += p.add_i_price
        if self.product.discount_price is not None:
            return self.quantity * self.product.discount_price + a
        else:
            return self.quantity * self.product.price + a

    @property
    def saved_price(self):
        if self.product.discount_price > 0:
            return self.get_total_price - self.product.price
        else:
            return 0

    def __str__(self):
        if self.additional_items.exists():
            return "%s %s with %s" % (self.user.username, self.product,
                                      [add.title for add in self.additional_items.all()])
        return "%s %s " % (self.user.username, self.product)


class Client(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address = models.CharField(max_length=1000)
    tel = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=8)
    amount = models.FloatField(default=300)
    photo = models.ImageField(upload_to="gallery", default="gallery/avatar.png")

    def __str__(self):
        return "client " + self.user.username


class ShippingAddress(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    # country = CountryField()
    postal_code = models.CharField(max_length=7)
    default = models.BooleanField(default=False)

    def __str__(self):
        return self.address


class CreditCardInfo(models.Model):
    name = models.CharField(max_length=70)
    number = models.CharField(max_length=70)
    expiration_date = models.DateField()


# class Coupon(models.Model):
#     code = models.CharField(max_length=9)
#     amount = models.FloatField()
#     def __str__(self):
#         return self.code


class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    amount = models.FloatField()
    payment_date = models.DateTimeField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    payment_type = models.CharField(choices=PAYMENTS_CHOICES, max_length=1)
    PayPal_email = models.EmailField(null=True, blank=True)
    credit_card_info = models.ForeignKey(CreditCardInfo, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return "%s %s" % (self.user.username, self.payment_date)


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    products = models.ManyToManyField(OrderProduct)
    order_date = models.DateTimeField(auto_now_add=True)
    ordered = models.BooleanField(default=False)
    ordered_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=2, default='ND')
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, null=True, blank=True)
    # coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True, blank=True)
    # TODO : ADD delivery man foreign key this will change the payment,then removed from delivery man
    ref_code = models.CharField(max_length=20)
    received = models.BooleanField(default=False)
    refund_requested = models.BooleanField(default=False)
    refund_granted = models.BooleanField(default=False)
    shipping_address = models.ForeignKey(ShippingAddress,
                                         on_delete=models.SET_NULL,
                                         blank=True,
                                         null=True)

    def __str__(self):
        return "%s %s" % (self.user.username, self.order_date)

    def total_saved_price(self):
        save = 0
        for p in self.products.all():
            save += p.saved_price
        return save

    @property
    def total_price(self):
        total = 0
        for p in self.products.all():
            total += p.get_total_price
        # total -= self.coupon.amount
        return total


class Refund(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    reason = models.TextField()
    accepted = models.BooleanField(default=False)
    in_queue = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.pk}"


class DeliveryMan(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tel = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    available = models.BooleanField()
    orders = models.ManyToManyField(Order, null=True, blank=True)
    orders_delivered = models.IntegerField(default=0)

    def __str__(self):
        return "delivery man " + self.user.username



