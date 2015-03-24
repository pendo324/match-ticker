import json
from gosu_gamers.gg_team import Dota2TeamScraper

dota_ts = Dota2TeamScraper()

teams = dota_ts.get_teams()

teams_dict = {'teams': []}

for team in teams:
	teams_dict['teams'].append(team.__dict__())
with open('teams.json', 'w') as json_file:
    json_file.write(json.dumps(teams_dict))