from lxml import html
import requests
import json
import os

def getItemSchema():
	url = 'https://raw.githubusercontent.com/SchemaTracker/SteamEcon/master/cache/schema_570.json'
	response = requests.get(url, headers={'Accept-Encoding': 'gzip'})
	if response.status_code == 200:
		items = response.json()
		with open(r'item_schema.json', 'w') as json_file:
		 	json_file.write(json.dumps(items))

if __name__ == '__main__':
	getItemSchema()
# <div add> + item_schema.XXX.txt </>
# current dota2 item schema since the API call is fucked up
