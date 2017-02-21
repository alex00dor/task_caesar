from django.conf.urls import url
from .views import decrypt, encrypt
app_name = 'api'
urlpatterns = [
    url(r'^encrypt/', encrypt, name='encrypt'),
    url(r'^decrypt/', decrypt, name='decrypt'),
]