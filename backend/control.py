from interface import Interface

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
#controller.addLeagueLogos()