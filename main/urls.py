from django.conf.urls import url
from django.views.generic.base import TemplateView
app_name = 'main'
urlpatterns = [
     url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
]
