var matchList = $.getJson("js/Dota2matches.json").done(function(json) {
	for (var i = 0; i < json.length; i++) {
		var match = json.games[i];
		insertMatch(match["team 1"].name, match["team 2"].name, match["live in"], match["team 1"].bet, match["team 2"].bet)
	}
})

function insertMatch(team1, team2, livein, team1bet, team2bet) {
	var team1Rank = teamRank(team1);
	var team1Country = teamCountry(team1);
	var team2Rank = teamRank(team2);
	var team2Country = teamCountry(team2);
}

function teamRank(team) {
	var teams = $.getJson("js/teams.json").done(function(json) {
		//search for the team
		for (var i = 0; i < json.length; i++) {
			return json.teams.world_rank;
		}
	})
}

function teamCountry(team) {
	var teams = $.getJson("js/teams.json").done(function(json) {
		//search for the team
		for (var i = 0; i < json.length; i++) {
			return json.teams.country;
		}
	})
}