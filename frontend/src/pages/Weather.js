fetch("http://api.weatherapi.com/v1/current.json?key=7f716f37a5c243009af191541232501&q=Lawrence, KS&aqi=no", {
  "method": "GET",
  "headers": {
  }
  })
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});

function processWeatherData(response) {
  
    var location=response.resolvedAddress;
    var days=response.days;
    console.log("Location: "+location);
    for (var i=0;i<days.length;i++) {
      console.log(days[i].datetime+": tempmax="+days[i].tempmax+", tempmin="+days[i].tempmin);
    }
  }