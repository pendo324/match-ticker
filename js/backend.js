function getMatches() {	
	console.log('at least it called');
	var json = $.getJSON('live_games.json', function(data) {
		console.log('json has been parsed I guess')
		$.each(data.result.games, function(i, match) {
			console.log("each statement: " + i + ' ' + match);
			if (match.hasOwnProperty('radiant_team')) {
				if (match.hasOwnProperty('dire_team')) {
					console.log("wtf, it actually worked?")
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
		tourney = getLeagueInfo(league_id);
		$('#matches').append('<div class=\'row col-xs-10 col-md-10 col-md-offset-1 col-xs-offset-1\'><h1 col-md-1> <img src=\'' +
		tourney[1] + '\'class=img-\'responsive img-thumbnail\'>' + tourney[0] + '</h1> <div col-md-5>' + rad_info[1] + 
		rad_info[0] + '</div> <div col-md-1> VS </div> <div col-md-5>' + dire_info[1] + dire_info[0] + '</div> </div>')
	}
	else { //future match from schedule.json
		rad_info = teamInfo(rad);
		dire_info = teamInfo(dire);
		tourney = getLeagueInfo(league_id);
		$('#matches').append('<div class=\'row col-xs-10 col-md-10 col-md-offset-1 col-xs-offset-1\'><h1 col-md-1> <img src=\'' +
		tourney[1] + '\'class=img-\'responsive img-thumbnail\'>' + tourney[0] + '</h1> <div class=\'col-md-5\'>' + 'Na`vi' + '</div> <div class=\'col-md-1\'> VS </div> <div class=\'col-md-5\'>' + 'Na`vi' + '</div> </div>')
	}
}

function teamInfo(team_id) {

}

function getLeagueInfo(league_id) {
	var name = '';
	var logo = '';
	var url = '';

	var json = $.getJSON('leagues.json', function(data) {
		$.each(data.result.leagues, function(i, league) {
			if (league_id == league.leagueid) {
				name = league.name;
				logo = league.logo;
				url = league.tournament_url;
			}
		});
	});	

	return [name, logo, url];
}
