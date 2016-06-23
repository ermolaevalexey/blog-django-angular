# blog2/api.py
from django.contrib.auth.models import User
from tastypie import fields
from django.db import models
from tastypie.authorization import DjangoAuthorization, Authorization
from tastypie.authentication import BasicAuthentication, Authentication
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from blog2.models import Post

class UserResource(ModelResource):

    class Meta:
        queryset = User.objects.all()
        resource_name = 'auth/user'
        fields = ['username', 'first_name', 'last_name', 'email', 'last_login']
        excludes = ['password', 'is_active', 'is_staff', 'is_superuser']
        allowed_methods = ['get', 'post']
        authorization = Authorization()
        authentication = BasicAuthentication()
        filtering = {
            'username': ALL
        }

class PostResource(ModelResource):
    # Maps `Entry.user` to a Tastypie `ForeignKey` field named `user`,
    # which gets serialized using `UserResource`. The first appearance of
    # 'user' on the next line of code is the Tastypie field name, the 2nd
    # appearance tells the `ForeignKey` it maps to the `user` attribute of
    # `Entry`. Field names and model attributes don't have to be the same.

    author = fields.ToOneField(UserResource, 'author')

    class Meta:
        queryset = Post.objects.all()
        resource_name = 'post'
        authentication = Authentication()
        authorization = Authorization()
        allowed_methods = ['get', 'post']
        filtering = {
            'user': ALL_WITH_RELATIONS,
            'pub_date': ['exact', 'lt', 'lte', 'gte', 'gt']
        }

class CurrentUserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'current_user'
        fields = ['username', 'first_name', 'last_name', 'email', 'last_login']
        allowed_methods = ['get', 'post']
        authorization = Authorization()
        authentication = BasicAuthentication()

    def get_object_list(self, request):
        users = super(CurrentUserResource, self).get_object_list(request)
        return users.filter(id=request.user.id)
