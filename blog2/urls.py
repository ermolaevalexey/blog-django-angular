from . import views

from django.conf.urls import url, include
from tastypie.api import Api
from blog2.api import PostResource, UserResource, CurrentUserResource

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(PostResource())
v1_api.register(CurrentUserResource())

urlpatterns = [
    url(r'^$', views.post_list, name='post_list'),
    url(r'^post/(?P<pk>[0-9]+)/$', views.post_detail, name='post_detail'),
    url(r'^post/new/$', views.post_new, name='post_new'),
    url(r'^api/', include(v1_api.urls))
] 