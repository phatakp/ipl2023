
from django.conf import settings
from django.core.management.base import BaseCommand

file_path = settings.BASE_DIR / "templates" / "index.html"
DJANGO_LOAD_STATIC = "{% load static %}"
STATIC = "/static/"


class Command(BaseCommand):
    help = 'Add Static files to DJANGO index.html'

    def handle(self, *args, **kwargs):
        with open(file_path, 'r+') as f:
            data = f.read()
            data = data[:15] + DJANGO_LOAD_STATIC + data[15:]
            fixed_data = self.add_django_static_to_files(data)
            f.seek(0)
            f.write(fixed_data)
            f.truncate()

    def add_django_static_to_files(self, data):
        SRC = 'src="/static/'
        srcpos = data.find(SRC)
        stpos = srcpos+data[srcpos:].find(STATIC)
        endsrc = stpos+data[stpos:].find('"')
        data = data[:stpos] + '{% static ' + "'" + \
            data[stpos+8:endsrc] + "'" + '%}' + data[endsrc:]

        HREF = 'href="/static/'
        hrefpos = data.find(HREF)
        stpos1 = hrefpos+data[hrefpos:].find(STATIC)
        endhref = stpos1+data[stpos1:].find('"')
        data = data[:stpos1] + '{% static ' + \
            "'" + data[stpos1+8:endhref] + "'" + '%}' + data[endhref:]

        return data
