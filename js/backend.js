var team_name, team_logo, league_name, league_url, league_logo;

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
	var rad_name, rad_logo, dire_name, dire_logo, tourney_name, tourney_url, tourney_logo;
	//not a future match, so it must be live
	if (typeof livein === 'undefined') {
		//get team tag, players, and logo file location
		$.when(getTeamInfo(rad)).done(function () {
			console.log(team_name);
			rad_name = team_name;
			rad_logo = team_logo;
		});
		$.when(getTeamInfo(dire)).done(function () {
			dire_name = team_name;
			dire_logo = team_logo;
		});
		$.when(getLeagueInfo(league_id)).done(function() {
			tourney_name = league_name;
			tourney_url = league_url;
			tourney_logo = league_logo;
		});
		$('#matches').append('<div class=\'row col-xs-10 col-md-10 col-md-offset-1 col-xs-offset-1\'><h3 col-md-1> <img src=\'' +
		tourney_logo + '\'class=img-\'responsive img-thumbnail\'>' + tourney_name + '</h3> <h4 class=\'col-md-5 text-right\'><img src=\'' + 
		team_logo + '/>\'' + rad_name + '</h4> <h5 class=\'col-md-1 text-center\'> VS </h5> <h4 class=\'col-md-5 text-left\'><img src=\'' + 
		dire_logo + '/>\'' + dire_name + '</h4> </div>')	}
	else { //future match from schedule.json
		rad_info = getTeamInfo(rad);
		dire_info = getTeamInfo(dire);
		tourney = getLeagueInfo(league_id);
		$('#matches').append('<div class=\'row col-xs-10 col-md-10 col-md-offset-1 col-xs-offset-1\'><h1 col-md-1> <img src=\'' +
		tourney[1] + '\'class=img-\'responsive img-thumbnail\'>' + tourney[0] + '</h1> <div class=\'col-md-5 text-right\'>' + 'Na`vi' + '</div> <div class=\'col-md-1 text-center\'> VS </div> <div class=\'col-md-5 text-left\'>' + 'Na`vi' + '</div> </div>');
	}
}

function getTeamInfo(team_id) {
	$.getJSON('known_teams.json', function(data) {
		$.each(data.teams, function(i, team) {
			if (team.id == team_id) {
				if (team.hasOwnProperty('logo')) {
					teamInfo(team.name, team.logo)
					return false;
				}
				else {
					logo = '';
					teamInfo(team.name, team.logo)
					return false;
				}
			}
		});
	});

	$.ajax({
		url: 'known_teams.json',
		dataType: 'json',
		async: false,
		success: function(data) {
			$.each(data.teams, function(i, team) {
				if (team.id == team_id) {
					if (team.hasOwnProperty('logo')) {
						teamInfo(team.name, team.logo)
						return false;
					}
					else {
						logo = '';
						teamInfo(team.name, team.logo)
						return false;
					}
				}
			});
		}
	});
}

function teamInfo(name, logo) {
	team_name = name;
	team_logo = logo;
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
	league_name = name;
	league_logo = logo;
	league_url = url;
	return [name, logo, url];
}
