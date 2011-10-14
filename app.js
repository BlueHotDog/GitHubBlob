var app = require('express').createServer();
var sys = require("sys");
var GitHubApi = require("github").GitHubApi;

var github = new GitHubApi(true);

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/info/:uid/:repo.:format', function(req,res) {
	var supportedFormats = ["jpg",
							"png",
							"gif"];
	var params = req.params;							
	if(supportedFormats.indexOf(req.params.format.toLowerCase())) {
		getRepoInfo(params.uid,params.repo, function(info) {
			console.log
		});
	} else {
		next();
	}
});

var repoInfo = {
	
}
function getRepoInfo(uid,repo,format, cb) {
	github.getRepoApi().show(uid,repo, function(err, info) {
		console.log(info);
	})
}

getRepoInfo("BlueHotDog", "contacts");
// app.listen(3000);