
from django.conf import settings
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/teams/', include('teams.urls', namespace='teams')),
    path('api/matches/', include('matches.urls', namespace='matches')),
    path('api/auth/', include('users.urls', namespace='users')),
    path('api/predictions/', include('predictions.urls', namespace='predictions')),
    path('api/stats/', include('stats.urls', namespace='stats')),
]

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
urlpatterns += [
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
