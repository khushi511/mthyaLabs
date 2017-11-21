var express = require('express');
var app = express();
var mysql = require('mysql'); 
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
//set views folder as entry point for html files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'mthyalabtest'
});

connection.connect(function(err){
	if(err){
		console.log("Error");
	}
	else{
		console.log('Database Connected');
	}
})

app.get('/', function(req, res){
	res.render('login');
})
app.get('/recommendation?*', function(req, res){
	var data;
	console.log("req query", req.query);
	connection.query("SELECT * FROM user where email = '"+req.query.email+"'", function(error, rows, fields){
					if(!!error){
						console.log("error in the query");
						res.send("SOME error occured while fetching user Activities")
					}
					else{
						data=rows;
						console.log("succesfull query rows at home", data);
						res.json(data);

					}
				})
})
app.post('/home', function(req, res){
	connection.query("SELECT * FROM user where email = '"+req.body.email+"'", function(error, rows, fields){
		if(!!error){
			console.log("error in the query");
		}
		else{
			if(rows.length > 0){
				console.log("succesfull query rows at login page");
				res.render('home');
			}
			else{
				console.log("No such email Id");
				res.send("No such email id");
			}
		}
	})
})

app.listen(1380);