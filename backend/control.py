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
#controller.getLeagues()

#Add logos to leagues
#time.sleep(20)
#this shit takes forever, don't do it unless the schema changed
#controller.addLeagueLogos(controller.getLeagues())