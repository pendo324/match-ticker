function getMatches() {	
	console.log('at least it called');
	var json = $.getJSON('live_games.json', function(data) {
		console.log('json has been parsed I guess')
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
		rad_info = teamInfo(rad);
		dire_info = teamInfo(dire);
		tourney = leagueInfo(league_id);
		$('#matches').append('<div class=\'row col-xs-10 col-md-10 col-md-offset-1 col-xs-offset-1\'><h1 col-md-1> <img src=\'' +
		tourney[1] + '\'class=img-\'responsive img-thumbnail\'>' + tourney[0] + '</h1> <div class=\'col-md-5 text-right\'><img src=\'' + 
		rad_info[1] + '/>\'' + rad_info[0] + '</div> <div class=\'col-md-1 text-center\'> VS </div> <div class=\'col-md-5 text-left\'><img src=\'' + 
		dire_info[1] + '/>\'' + dire_info[0] + '</div> </div>')	}
	else { //future match from schedule.json
		rad_info = teamInfo(rad);
		dire_info = teamInfo(dire);
		tourney = getLeagueInfo(league_id);
		$('#matches').append('<div class=\'row col-xs-10 col-md-10 col-md-offset-1 col-xs-offset-1\'><h1 col-md-1> <img src=\'' +
		tourney[1] + '\'class=img-\'responsive img-thumbnail\'>' + tourney[0] + '</h1> <div class=\'col-md-5 text-right\'>' + 'Na`vi' + '</div> <div class=\'col-md-1 text-center\'> VS </div> <div class=\'col-md-5 text-left\'>' + 'Na`vi' + '</div> </div>');
	}
}

function getTeamInfo(team_id) {
	var team_name, team_logo;
	var json = $.getJSON('known_teams.json', function(data) {
		$.each(data.teams, function(i, team) {
			var name, logo;
			if (team.id == team_id) {
				team_name = team.name;
				if (team.hasOwnProperty('logo')) {
					console.log(team.name, team.logo);
					console.log(name, logo);
					teamInfo(team.name, team.logo);
				}
				else {
					logo = '';
					console.log(team.name, team.logo);
					console.log(name, logo);
					teamInfo(team.name, team.logo);
				}
			}
		});
	})	
}

function teamInfo(name, logo) {
	return [name, logo];
}

function getLeagueInfo(league_id) {
	var json = $.getJSON('leagues.json', function(data) {
		$.each(data.result.leagues, function(i, league) {
			if (league.leagueid == league_id) {
				leagueInfo(league.name, league.logo, league.tournament_url);
			}
		});
	});	
}

function leagueInfo(name, logo, url) {
	return [name, logo, url];
}
