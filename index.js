const express = require('express');
// const data = require('./data')
  
const app = express();

app.get('/testdata', (req, res, next) => {
	console.log("Test data: ");
  res.send('backend Data');
})

app.listen(5000, () => {
  console.log('Server started!');
});
