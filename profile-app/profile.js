// require https module
const https = require('https');

// require http module for status codes
const http = require('http');

// print error messages
const printError = error => console.log(error.message);

// function to print the message on screen 
const printMessage = (username, badgeCount, points) => {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
	console.log(message);
}

// function to fetch the profile data of the passed in username
const get = (username) => {
	try {
		// Connect to the API URL (https://teamtreehouse.com/username.json)
		const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
			if (response.statusCode === 200) {
				let body = '';
				// Read the data
				response.on('data', data => {
					body += data.toString();
				})

				response.on('end', () => {
					try {
						// Parse the data
						const profile = JSON.parse(body);
						// Print the data
						printMessage(username, profile.badges.length, profile.points.JavaScript);
					} catch (error) {
						printError(error);
					}
				});
			} else {
				const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
				const statusCodeError = new Error(message);
				printError(statusCodeError);
			}
		});

		request.on('error', error => console.error(`Problem with request: ${error.message}`));
	} catch (error) {
		printError(error);
	}	
}

module.exports.get = get;