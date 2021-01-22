// Take user input of city
//var searchCity = document.querySelector('#searchCity').value.trim;
//generate todays date in (MM/DD/YYYY) format
let [month, date, year]  = new Date().toLocaleDateString("en-US").split("/")
let today = (month + '/' + date + '/' + year);

//search city in weather api
function displayCity(){
    
    var searchCity = document.querySelector('#searchCity').value;
    var api_key = '2793445b72933fa193fcc65752f1319c'
    
    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q='
         + searchCity + '&appid=' + api_key
    )
    .then(function(response){ 
    return response.json();
    })
    .then(function(response){
        var kelTemp = response.list[0].main.temp;
        var fTemp = Math.round((kelTemp-273.15)*9/5+32) ;        
        var humid = response.list[0].main.humidity;
        var wind = response.list[0].wind.speed;
       // var uv = ;
     //  console.log(response);

       //Calculate UV Index
       var lat = response.city.coord.lat;
       var lon = response.city.coord.lon;
       fetch(
           'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + api_key)
       .then(function(response){
        return response.json();
       }).then(function(response){
        var uv = response.value;

        var uvIndex = document.getElementById('uvIndex');
        uvIndex.innerHTML = 'UV Index: ' + uv ;

        var uvColors =function(){
            if (uv < 3){
            uvIndex.setAttribute("class","low");
        } else if (3 < uv < 6){
            uvIndex.setAttribute("class","mod");
        } else if (7 < uv < 8){
            uvIndex.setAttribute("class","high");
        } else if (9 < uv < 11){
            uvIndex.setAttribute("class","vHigh");
        } else if (12 < uv){
            uvIndex.setAttribute("class","extr");
        }
       };

       uvColors();

    }) 
       ;

       //display city name, temp, hum, wind, UV in city-today div
        var responseContainerEl = document.querySelector('#city-today');

        var displayCityName = document.createElement('h2');
        displayCityName.innerHTML = searchCity + ' ('+ today + ')' //+ response.list[0].weather.icon;
        responseContainerEl.appendChild(displayCityName);

        var temperature = document.getElementById('temperature');
        temperature.innerHTML = 'Temperature: ' + fTemp + ' °F'

        var humidity = document.getElementById('humidity');
        humidity.innerHTML = 'Humidity: ' + humid + '%'

        var windSpeed = document.getElementById('windSpeed');
        windSpeed.innerHTML = 'Wind Speed: ' + wind + ' MPH';


        // Display 5 day forecast
        // Day 1
        var day1 = document.getElementById('card-title1');
        day1Val = response.list[1].dt_txt;
        day1ValFmt = moment(day1Val, "YYYY-MM-DD h:mm:ss");
        day1Value = day1ValFmt.format("MM/DD/YYYY");
        day1.innerHTML = day1Value;

        var temperature1 = document.getElementById('card-temp1');
        var kelTemp1 = response.list[1].main.temp;
        var fTemp1 = Math.round((kelTemp1-273.15)*9/5+32) ;    
        temperature1.innerHTML = 'Temp: ' + fTemp1 + ' °F'

        var humidity1 = document.getElementById('card-hum1');
        var humid1 = response.list[1].main.humidity;
        humidity1.innerHTML = 'Humidity: ' + humid1 + '%';

        // Day 2
        var day2 = document.getElementById('card-title2');
        day2Val = response.list[6].dt_txt;
        day2ValFmt = moment(day2Val, "YYYY-MM-DD h:mm:ss");
        day2Value = day2ValFmt.format("MM/DD/YYYY");
        day2.innerHTML = day2Value;

        var temperature2 = document.getElementById('card-temp2');
        var kelTemp2 = response.list[6].main.temp;
        var fTemp2 = Math.round((kelTemp2-273.15)*9/5+32) ;    
        temperature2.innerHTML = 'Temp: ' + fTemp2 + ' °F'
 
        var humidity2 = document.getElementById('card-hum2');
        var humid2 = response.list[6].main.humidity;
        humidity2.innerHTML = 'Humidity: ' + humid2 + '%';

        // Day 3
        var day3 = document.getElementById('card-title3');
        day3Val = response.list[12].dt_txt;
        day3ValFmt = moment(day1Val, "YYYY-MM-DD h:mm:ss");
        day3Value = day3ValFmt.format("MM/DD/YYYY");
        day3.innerHTML = day3Value;

        var temperature3 = document.getElementById('card-temp3');
        var kelTemp3 = response.list[12].main.temp;
        var fTemp3 = Math.round((kelTemp3-273.15)*9/5+32) ;    
        temperature3.innerHTML = 'Temp: ' + fTemp3 + ' °F'
 
        var humidity3 = document.getElementById('card-hum3');
        var humid3 = response.list[12].main.humidity;
        humidity3.innerHTML = 'Humidity: ' + humid3 + '%';

        // Day 4 
        var day4 = document.getElementById('card-title4');
        day4Val = response.list[18].dt_txt;
        day4ValFmt = moment(day4Val, "YYYY-MM-DD h:mm:ss");
        day4Value = day4ValFmt.format("MM/DD/YYYY");
        day4.innerHTML = day4Value;

        var temperature4 = document.getElementById('card-temp4');
        var kelTemp4 = response.list[18].main.temp;
        var fTemp4 = Math.round((kelTemp4-273.15)*9/5+32) ;    
        temperature4.innerHTML = 'Temp: ' + fTemp4 + ' °F'
 
        var humidity4 = document.getElementById('card-hum4');
        var humid4 = response.list[18].main.humidity;
        humidity4.innerHTML = 'Humidity: ' + humid4 + '%';

        // Day 5
        var day5 = document.getElementById('card-title5');
        day5Val = response.list[24].dt_txt;
        day5ValFmt = moment(day5Val, "YYYY-MM-DD h:mm:ss");
        day5Value = day5ValFmt.format("MM/DD/YYYY");
        day5.innerHTML = day5Value;

        var temperature5 = document.getElementById('card-temp5');
        var kelTemp5 = response.list[24].main.temp;
        var fTemp5 = Math.round((kelTemp5-273.15)*9/5+32) ;    
        temperature5.innerHTML = 'Temp: ' + fTemp5 + ' °F'
 
        var humidity5 = document.getElementById('card-hum5');
        var humid5 = response.list[24].main.humidity;
        humidity5.innerHTML = 'Humidity: ' + humid5 + '%';

        //empty user input of city and add city name to ul city-list array
        allCities = [];

        var city = document.getElementById('city-list');
        city.innerHTML = searchCity;

        allCities.push(searchCity);

        })};




