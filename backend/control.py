from interface import Interface
import os
import time
import threading

#Class for running tests
controller = Interface()

#Update known_teams.json
controller.processTeams(controller.getLiveGames())

#Update live_games.json
controller.getLiveGames()

#Update schedule.json
controller.getSchedules()

#Update leagues.json
def worker():
	controller.getLeagues()

t = threading.Thread(target=worker)
t.start()
t.join()

#Add logos to leagues
#time.sleep(20)
controller.addLeagueLogos(controller.getLeagues())