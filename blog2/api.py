# blog2/api.py
from django.contrib.auth.models import User
from tastypie import fields
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from blog2.models import Post

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        fields = ['username', 'first_name', 'last_name', 'email', 'last_login']
        excludes = ['password', 'is_active', 'is_staff', 'is_superuser']
        allowed_methods = ['get']

class PostResource(ModelResource):
    # Maps `Entry.user` to a Tastypie `ForeignKey` field named `user`,
    # which gets serialized using `UserResource`. The first appearance of
    # 'user' on the next line of code is the Tastypie field name, the 2nd
    # appearance tells the `ForeignKey` it maps to the `user` attribute of
    # `Entry`. Field names and model attributes don't have to be the same.
    user = fields.ForeignKey(UserResource, 'user', null=True, blank=True)

    class Meta:
        queryset = Post.objects.all()
        resource_name = 'post'
        authorization = Authorization()