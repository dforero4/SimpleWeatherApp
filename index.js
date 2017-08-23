function getWeather() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getData,error,{timeout:5000});
    };
    
}

function error() {
  $("#getWeather").remove();
  $("#temp").html("Sorry, unable to find location!");
  document.getElementById("cardDisplay").style.display = "block";
}

function getData(position){
  
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var darkSkyAPI = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1d23a5f9b523a8e5e33f004b192115a4/"+lat+","+lon;
  
  $.getJSON(darkSkyAPI, function(forecast){
    
    var cityArray = forecast.timezone.split("/");
    $("#location").html(cityArray[1]);
    
    var pic = getPic(forecast.currently.icon);
    $("#icon").attr("src",""+pic+"");
    
    var fahr = Math.round(forecast.currently.temperature,-1);
    var appFahr = Math.round(forecast.currently.apparentTemperature,-1);
    $("#temp").html(fahr+" °F</b>");
    $("#temp2").html("Feels like: "+appFahr+" °F");
    
    $("#celsius").click(function() {
      $("#fahren").prop('disabled',false);
      $("#celsius").prop('disabled',true);
      var cel = (forecast.currently.temperature-32)*(5/9);
      cel = Math.round(cel,-1);
      var appCel = (forecast.currently.apparentTemperature-32)*(5/9);
      appCel = Math.round(appCel,-1);
      $("#temp").html(cel+" °C");
      $("#temp2").html("Feels like: "+appCel+" °C");
    });
    
    $("#fahren").click(function() {
      $("#celsius").prop('disabled',false);
      $("#fahren").prop('disabled',true);
      $("#temp").html(fahr+" °F");
      $("#temp2").html("Feels like: "+appFahr+" °F");
    });
    
    $("#humidity").html("Humidity:  "+(forecast.currently.humidity)*100+"%");
    $("#precipProb").html("Precipitation Probability:  "+(forecast.currently.precipProbability)*100+"%");
    $("#windSpeed").html("Wind Speed:  "+forecast.currently.windSpeed+" mph");
    
    $("#getWeather").remove();
    document.getElementById("cardDisplay").style.display = "block";
  });
  
};

function getPic(icon) {
  var result = "";
  
  var picList = {
    "clear-day": "https://dl.dropboxusercontent.com/s/rwgsdjjsumhabb8/clear-day.png?dl=0",
    "clear-night": "https://dl.dropboxusercontent.com/s/u5vmh30kjmvna50/clear-night.png?dl=0",
    "rain": "https://dl.dropboxusercontent.com/s/c2xz9m45umgzflh/rain.png?dl=0",
    "snow": "https://dl.dropboxusercontent.com/s/hx8mhntawnypk9r/snow.png?dl=0",
    "sleet": "https://dl.dropboxusercontent.com/s/vb1cdh90w329wwi/sleet.png?dl=0",
    "wind": "https://dl.dropboxusercontent.com/s/akgl949opyvjfcn/wind.png?dl=0",
    "fog": "https://dl.dropboxusercontent.com/s/nvw2lytfwbxx5dn/fog.png?dl=0",
    "cloudy": "https://dl.dropboxusercontent.com/s/cwp3z5x9jegyqcv/cloudy.png?dl=0",
    "partly-cloudy-day": "https://dl.dropboxusercontent.com/s/isnvqecudx7klbq/partly-cloudy.png?dl=0",
    "partly-cloudy-night": "https://dl.dropboxusercontent.com/s/2a7h0t1qsd3uts2/partly-cloudy-night.png?dl=0"
};
  
  result = picList[icon];
  return result;
}