function getMatches() {	
	var json = $.getJSON('live_games.json', function(data) {
		$.each(data.result.games, function(i, match) {
			if (match.hasOwnProperty('radiant_team')) {
				if (match.hasOwnProperty('dire_team')) {
					insertMatch(match.radiant_team.team_id, match.dire_team.team_id, 
						match.league_id, match.players);
				}
			}
		});
	});
	return json;
}

function insertMatch(rad, dire, league_id, players, livein) {
	//not a future match, so it must be live
	if (typeof livein === 'undefined') {
		//get team tag, players, and logo file location
		rad_info = getTeamInfo(rad);
		dire_info = getTeamInfo(dire);
		tourney = getLeagueInfo(league_id);
		$('#matches').append('<div class=\'row col-xs-10 col-md-10 col-md-offset-1 col-xs-offset-1\'><h1 col-md-1> <img src=\'' +
		tourney[1] + '\'class=img-\'responsive img-thumbnail\'>' + tourney[0] + '</h1> <div class=\'col-md-5 text-right\'><img src=\'' + 
		rad_info[1] + '/>\'' + rad_info[0] + '</div> <div class=\'col-md-1 text-center\'> VS </div> <div class=\'col-md-5 text-left\'><img src=\'' + 
		dire_info[1] + '/>\'' + dire_info[0] + '</div> </div>')	}
	else { //future match from schedule.json
		rad_info = getTeamInfo(rad);
		dire_info = getTeamInfo(dire);
		tourney = getLeagueInfo(league_id);
		$('#matches').append('<div class=\'row col-xs-10 col-md-10 col-md-offset-1 col-xs-offset-1\'><h1 col-md-1> <img src=\'' +
		tourney[1] + '\'class=img-\'responsive img-thumbnail\'>' + tourney[0] + '</h1> <div class=\'col-md-5 text-right\'>' + 'Na`vi' + '</div> <div class=\'col-md-1 text-center\'> VS </div> <div class=\'col-md-5 text-left\'>' + 'Na`vi' + '</div> </div>');
	}
}

function getTeamInfo(team_id) {
	var team_name;
	var team_logo;
	var json = $.getJSON('known_teams.json', function(data) {
		$.each(data.teams, function(i, team) {
			if (team.id == team_id) {
				if (team.hasOwnProperty('logo')) {
					team_name = team.name;
					team_name = 'fuck this shit';
					team_logo = team.logo;
					return false;
				}
				else {
					logo = '';
					team_name = team.name;
					team_logo = team.logo;
					return false;
				}
			}
		});
	});
	console.log(team_name);
}

function teamInfo(name, logo, data) {
	return [name, logo, data];
}

function getLeagueInfo(league_id) {
	var json = $.getJSON('leagues.json', function(data) {
		$.each(data.result.leagues, function(i, league) {
			if (league.leagueid == league_id) {
				return leagueInfo(league.name, league.logo, league.tournament_url);
			}
		});
	});	
}

function leagueInfo(name, logo, url) {
	return [name, logo, url];
}
