from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/blog/", include("blog.urls")),
    path("api/test/", include("testapp.urls")),
]
