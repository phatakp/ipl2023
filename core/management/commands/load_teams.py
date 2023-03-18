from django.apps import apps
from django.conf import settings
from django.core.management.base import BaseCommand

Team = apps.get_model('teams',"Team")

class Command(BaseCommand):
    help = 'Loads IPL teams to DB'

    def handle(self, *args, **kwargs):
        self.upload_teams_db()

    def upload_teams_db(self):
        Team.objects.all().delete()
        data = [Team(shortname=shortname,longname=longname, active=shortname not in ('KOC', 'RPSG', 'GL'))
            for shortname, longname in settings.TEAM_CHOICES]
        Team.objects.bulk_create(data)
        print("Team details saved")