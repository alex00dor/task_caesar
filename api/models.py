from django.db import models

# Create your models here.
class Log(models.Model):
    action = models.CharField(max_length=2, choices=(('en', 'Encrypt'), ('de', 'Decrypt'),))
    text = models.TextField()
    result = models.TextField()
    date = models.DateTimeField(auto_now_add=True)