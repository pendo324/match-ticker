import json
from gosu_gamers.gg_match import Dota2MatchScraper

match_scraper = Dota2MatchScraper()

live_matches = match_scraper.find_live_matches()
for live_match in live_matches:
    live_match.live_in = 'Live'

upcoming_matches = match_scraper.find_upcoming_matches()

games_dict = {'games': []}
for match in live_matches + upcoming_matches:
    games_dict['games'].append(match.__dict__())
with open('matchticker.json', 'w') as json_file:
    json_file.write(json.dumps(games_dict))
