import json
import os
from datetime import datetime

from django.apps import apps
from django.conf import settings
from django.core.management.base import BaseCommand

Team = apps.get_model('teams', "Team")
Match = apps.get_model('matches', "Match")


class Command(BaseCommand):
    help = 'Loads IPL matches to DB'

    def handle(self, *args, **kwargs):
        self.upload_matches_db()

    def upload_matches_db(self):
        Match.objects.all().delete()
        objs = []
        with open(os.path.join(settings.BASE_DIR, 'data', 'matches.json'), encoding='utf-8') as data:
            matchesData = json.loads(data.read())

            for match in matchesData:
                try:
                    date_str = f"{match['MatchDateNew']} {match['MatchTime']} +0530"
                    date = datetime.strptime(date_str, '%d %b %Y %H:%M %z')
                    num = int(match['RowNo'])
                    team1 = Team.objects.get(longname=match['HomeTeamName'])
                    team2 = Team.objects.get(longname=match['AwayTeamName'])
                    venue = f"{match['GroundName']}, {match['city']}"

                    match = Match(num=num, date=date, team1=team1, team2=team2,
                                  type=settings.LEAGUE, venue=venue)
                    objs.append(match)
                except:
                    print(f"{match['RowNo']=}")
                    print(f"{match['FirstBattingTeamCode']=}")
                    print(f"{match['SecondBattingTeamCode']=}")
                    print(f"{match['1Summary']=}")
                    print(f"{match['2Summary']=}")
                    print(f"{match['GroundName']=}")
                    print(f"{match['city']=}")
                    print(f"{match['MatchDateNew']=}")
                    print(f"{match['MatchTime']=}")
                    print(f"{match['HomeTeamName']=}")
                    print(f"{match['AwayTeamName']=}")
                    print(f"{match['MatchOrder']=}")
                    print("---------------------------------------")
                    break
            Match.objects.bulk_create(objs)
            print("Match Details saved successfully")
