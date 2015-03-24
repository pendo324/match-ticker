from interface import Interface
import os
import time

#Class for running tests
controller = Interface()

#Update known_teams.json
controller.processTeams(controller.getLiveGames())

#Update live_games.json
controller.getLiveGames()

#Update schedule.json
controller.getSchedules()

#Update leagues.json
controller.getLeagues()

#Add logos to leagues
#time.sleep(20)
#controller.addLeagueLogos()