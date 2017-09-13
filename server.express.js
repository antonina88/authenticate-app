const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.route("/login")
.post((req, res) => {
	setTimeout(function() {
		const {Username, Password} = req.body;
		if (Username === "User" && Password === "Password") {
			return res.status(200).send({
		        Auth: "Logged", 
		        Language: "EN"
		    });
		} else if (Username === "foo" && Password === "bar") {
			return res.status(400).send({
		        Auth: "Denied"
		    });
		}
		else {
			return res.status(400).send({
		        Auth: "Denied"
		    });
		}
		
		console.log(req.body);
		res.end();
	}, 1000);
});

app.listen(8000, () => {
  console.log("Server is up and running on port 8000");
});