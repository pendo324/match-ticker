Match Ticker
=======

My inspiration for this project comes from the gosugamer match ticker that is shown here: http://www.gosugamers.net/dota2/gosubet which is also used on the [Dota 2 subreddit](dota2.reddit.com) sidebar.

My goals for the project were to make a decent looking website that would display all of the live games that were going on in leagues that were amateur or above. I wanted this to be fully automated.

After working on this project for a while, I realized a few things:
  * There is (was) no real way to automate the process, since players and teams were very random. Sometimes a player would just be kicked from a team completely arbitarily. Other times, they would just change their in game name to something arbitary. Since I last worked on this, Valve has added further capability to find the "real" professional names of players to their API, which would make getting that information automatically a lot simpler.
  * The GosuGamers match ticker uses some database where they input information manually. There is no other way to accurately get what country a team is from using the Dota 2 API provided by Valve.
  * I started disliking Python for what I was using it for. If I started this project again, I would probably use Javascript (node.js/io.js), since there really is a bigger ecosystem for this type of thing.
  * My web design just wasn't great, and I had no real desire to redesign a website, so while all of the backend scripts did work, and still will, I didn't really have it in me to redesign the website using the tools that I started the project with (Python). It would have been *much* easier had I used Javascript from the start.

##As it is right now...
The project can get teams, store them in a json file, along with team pictures, and tell you what the live games are. It also creates a pretty terrible looking website, but that's not too interesting.

##Setup
If you want to use this script, you need to change the API key in the interface.py file. After that, the way I used it at least, was by setting up a cron job that runs the control file periodically to update everything using the 'A' launch option.

##License
Do whatever you want with this. Really. If you want to mention that I wrote some of the source, that's cool too. But I don't really care too much about that. Whatever you do, PLEASE change how the website is generated. That's all I ask of you. Oh, and if you actually do make something cool, tell me about it. I'd like to see it/help you out with it.
