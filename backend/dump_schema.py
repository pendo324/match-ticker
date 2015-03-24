import requests
import json
import os
import time
import shutil

global api_key
api_key = '26AF57E923E0D8E5E63C006BA68D78FE'

def dumpSchema():
	schema_api = "https://api.steampowered.com/IEconItems_570/GetSchema/v0001/?key=" + api_key
	print(api_key + "\n")
	response = requests.get(schema_api, headers={'Accept-Encoding': 'gzip'})
	if response.status_code == 200:
		print("it worked\n")
		items = response.json()
		with open(r'item_schema.json', 'w') as json_file:
		 	json_file.write(json.dumps(items))

if __name__ == '__main__': 
	dumpSchema()