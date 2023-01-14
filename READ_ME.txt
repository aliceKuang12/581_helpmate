Tools:
Postman Desktop App (install at 'app.getpostman.com'),
2 terminal windows



How to run project:

1. open cmd, navigate to project\backend
2. run 'node server.js'
  1. open postman desktop app  
  3. send a get request to 'http://localhost:5000/getUrl'
  5. go to link in response body, i.e.
	{ 
		"url": 
			"https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.activity.read%20profile%20email%20openid&state=%7B%7D&response_type=code&client_id=744855455027-gdjvbr2gaht9pfnpiald3afpeo1lo83m.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fsteps"
	}
  7. after redirection, sign in with a google account
3. open anotherh cmd window, navigate to project\frontend
4. run 'npm start'
5. click on health tab and look on right panel for results