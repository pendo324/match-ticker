function getMatches() {	
	var matchList = $.getJSON("live_games.json").done(function(json) {
		for (var i = 0; i < json.length; i++) {
			var match = json.result.games[i];
			if (match.hasOwnProperty(radiant_team)) {
				if (match.hasOwnProperty(dire_team)) {
					instertMatch(match.radiant_team.team_id, match.dire_team.team_id, match.league_id, match.players);
				}
			}
		}
	})
	return matchList;
}

function insertMatch(rad, dire, league_id, players, livein) {
	//not a future match, so it must be live
	if (typeof livein === 'undefined') {
		//get team tag, players, and logo file location
		rad_info = teamInfo(team_id);
		dire_info = teamInfo(team_id);
		tourney = getLeagueInfo();
		$('#matches').append('<div class=\'row col-xs-10 col-md-10 col-md-offset-1 col-xs-offset-1\'><h1 col-md-1> <img src=\'' +
		tourney[1] + '\'class=img-\'responsive img-thumbnail\'>' + tourney[0] + '</h1> <div col-md-5>' + rad_info[1] + 
		rad_info[0] + '</div> <div col-md-1> VS </div> <div col-md-5>' + dire_info[1] + dire_info[0] + '</div> </div>')
	}
	else { //future match from schedule.json

	}
}

function teamInfo(team_id) {
	var teams = $.getJSON("known_teams.json").done(function(json) {
		for (var i = 0; i < json.length; i++) {
			var team = json.teams[i];
			if (team.id == team_id) {
				return [team.name, team.logo, team.tag, team.roster];
			}
		}
	})
}

function getLeagueInfo(league_id) {
	var name = '';
	var logo = '';
	var url = '';
	var logo = $.getJSON("leagues.json").done(function(json) {
		for (var i = 0; i < json.leagues; i++) {
			var league = json.result.leagues[i];
			name = league.name;
			logo = league.logo;
			url = league.tournament_url;
		}
	})
	return [name, logo, url];
}