import requests
import json
import os
import time
import shutil

global api_key
api_key = '26AF57E923E0D8E5E63C006BA68D78FE'
global dir
dir = os.path.dirname(os.path.abspath(__file__))

def getNames(steam_ids, tag):
	roster = {'tag': tag, 'players': []}
	if steam_ids is not None and steam_ids is not 0:
		for i in range(0, len(steam_ids)):
			#print(str(i) + ' \t\t\t\t\t' + str(steam_ids) + ' ' + tag)
			steam_api = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + api_key + "&steamids=" + str(steam_ids[i] + 76561197960265728)
			response = requests.get(steam_api, headers={'Accept-Encoding': 'gzip'})
			if response.status_code == 200:
				roster['players'].append(response.json()["response"]["players"][0]["personaname"])

	return roster

def getRoster(team_id):
	team_api = "https://api.steampowered.com/IDOTA2Match_570/GetTeamInfoByTeamID/v001/?key=" + api_key + "&start_at_team_id=" + str(team_id) + "&teams_requested=1"
	response = requests.get(team_api, headers={'Accept-Encoding': 'gzip'})
	if response.status_code == 200:
		__team__ = response.json()["result"]["teams"][0]
		#roster_dict = {'roster': []}
		#roster = ''
		roster = []
		tag = str(__team__['tag'])
		#return response.json()
		i = 0
		while i < 5:
			if 'player_' + str(i) + '_account_id' in __team__:
				roster.append(__team__['player_' + str(i) + '_account_id'])
			i = i + 1
		return getNames(roster, tag)

def getLiveGames():
	teams_url = "https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v0001/?key="+ api_key
	response = requests.get(teams_url, stream = True, headers={'Accept-Encoding': 'gzip'})
	if response.status_code == 200:
		 #return response.json()
		 __team__ = response.json()
		 with open(r'live_games.json', 'w') as json_file:
		 	json_file.write(json.dumps(__team__))
		 return __team__

def dlLogo(logoid, dest):
	logo_req = "http://api.steampowered.com/ISteamRemoteStorage/GetUGCFileDetails/v1/?key=" + api_key + "&appid=570&ugcid=" + str(logoid)
	response = requests.get(logo_req, stream = True)
	if response.status_code == 200:
		r = requests.get(response.json()["data"]["url"], stream= True)
		if r.status_code == 200:
			with open(dest, 'wb') as f:
				shutil.copyfileobj(r.raw, f)

def processTeams(matches):
	with open('known_teams.json') as f_json:
		teams_dict = json.load(f_json)
	#teams_dict = {'teams': []}
	if matches is not None:
		for match in matches["result"]["games"]:
			#print (match["radiant_team"]["team_id"])
			if "radiant_team" in match:
				rad_team_id = match["radiant_team"]["team_id"]
				rad_team_roster = getRoster(rad_team_id)
				if "team_name" in match["radiant_team"]:
					rad_team_name = match["radiant_team"]["team_name"]
					file_name = rad_team_name.replace("/", u"\2044")
					rad_team_logo = os.path.join(dir, 'logos/') + file_name + ".png"
					with open('known_teams.json', 'r') as f:
						for line in f:
							if rad_team_name not in line:
								teams_dict['teams'].append({
									'id' : rad_team_id,
									'name' : rad_team_name,
									'logo' : rad_team_logo,
									'roster' : rad_team_roster
								})
					if not os.path.isfile(os.path.join(dir, 'logos/') + rad_team_name + ".png"):
						dlLogo(match["radiant_team"]["team_logo"], rad_team_logo)
	
			if "dire_team" in match:
				bad_team_id = match["dire_team"]["team_id"]
				bad_team_roster = getRoster(bad_team_id)
				if "team_name" in match["dire_team"]:
					bad_team_name = match["dire_team"]["team_name"]
					file_name = bad_team_name.replace("/", u"\2044")
					bad_team_logo = os.path.join(dir, 'logos/') + file_name + ".png"
					with open('known_teams.json', 'r') as f:
						for line in f:
							if bad_team_name not in line:
								teams_dict['teams'].append({
									'id' : bad_team_id,
									'name' : bad_team_name,
									'logo' : bad_team_logo,
									'roster' : bad_team_roster
								})
					if not os.path.isfile(os.path.join(dir, 'logos/') + bad_team_name + ".png"):
						dlLogo(match["dire_team"]["team_logo"], bad_team_logo)

	with open('known_teams.json', 'w') as json_file:
		json_file.write(json.dumps(teams_dict))

if __name__ == '__main__': 
	i = 0
	while (i < 144):
		processTeams(getLiveGames())
		i = i + 1
		time.sleep(900)
