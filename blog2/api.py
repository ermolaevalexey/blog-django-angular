# blog2/api.py
from django.contrib.auth.models import User
from tastypie import fields
from tastypie.authorization import DjangoAuthorization
from tastypie.authentication import BasicAuthentication
from tastypie.resources import ModelResource
from blog2.models import Post

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'auth/user'
        fields = ['username', 'first_name', 'last_name', 'email', 'last_login']
        excludes = ['password', 'is_active', 'is_staff', 'is_superuser']
        allowed_methods = ['get', 'post']
        authorization = DjangoAuthorization()
        authentication = BasicAuthentication()
        #def dehydrate(self, bundle):
        #    if bundle.request.user.pk == bundle.obj.pk:
        #        bundle.data['email'] = bundle.obj.email
        #    return bundle

class PostResource(ModelResource):
    # Maps `Entry.user` to a Tastypie `ForeignKey` field named `user`,
    # which gets serialized using `UserResource`. The first appearance of
    # 'user' on the next line of code is the Tastypie field name, the 2nd
    # appearance tells the `ForeignKey` it maps to the `user` attribute of
    # `Entry`. Field names and model attributes don't have to be the same.
    class Meta:
        queryset = Post.objects.all()
        resource_name = 'post'

class CurrentUserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'current_user'
        fields = ['username', 'first_name', 'last_name', 'email', 'last_login']
        allowed_methods = ['get', 'post']
        authorization = DjangoAuthorization()
        authentication = BasicAuthentication()

    def get_object_list(self, request):
        users = super(CurrentUserResource, self).get_object_list(request)
        return users.filter(id=request.user.id)
