var app = require('express').createServer(),
	sys = require("sys"),
	github = new (require("github").GitHubApi)(true),
	Canvas = require('canvas'),
	fs = require('fs');

app.get('/', function(req, res){
	res.send('<img src="' + generateScore("hello there danni") + '" />');
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
		next(); }
});
var repoInfo = {
	
}


function generateScore(t) {
	var Canvas = require('canvas'),
		Image = Canvas.Image,
		canvas = new Canvas((14+5)*5+50, 14),
		ctx = canvas.getContext('2d'),
		fs = require('fs');

	var textToWrite = t;
	ctx.font = 'normal 14px Impact, serif';
	ctx.fillStyle = '#FF7C0C';
	var initialStar = ctx.measureText(textToWrite).width;
	while(initialStar>50) {
		textToWrite =  textToWrite.slice(0,textToWrite.length-1);
		initialStar = ctx.measureText(textToWrite).width;
	}
	ctx.fillText(textToWrite, 0, 14, 50);
	console.log(initialStar);
	var star = fs.readFileSync(__dirname + '/images/star.png');

	var img = new Image;
	img.src = star;
	for(var i=0;i<5;i++) {
		ctx.drawImage(img, initialStar+i*14+5*i, 0);
	}
	return canvas.toDataURL();	
}
function getRepoInfo(uid,repo,format, cb) {
	github.getRepoApi().show(uid,repo, function(err, info) {
		console.log(info);
	})
}


// getRepoInfo("BlueHotDog", "contacts");

app.listen(3000);