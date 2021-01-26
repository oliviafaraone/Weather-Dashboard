// Take user input of city
//var searchCity = document.querySelector('#searchCity').value.trim;
//generate todays date in (MM/DD/YYYY) format
let [month, date, year]  = new Date().toLocaleDateString("en-US").split("/")
let today = (month + '/' + date + '/' + year);
allCities = [];

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
} ;

//search city in weather api
function displayCity(){
    
    var searchCity = document.querySelector('#searchCity').value;
    document.getElementById('searchCity').value=' ';
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
        var icon = response.list[0].weather[0].icon;
        
       //Calculate UV Index
       var lat = response.city.coord.lat;
       var lon = response.city.coord.lon;
       fetch(
           'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + api_key)
       .then(function(response){
        return response.json();
       }).then(function(response){
        var uv = response.value;
        console.log(uv);

        var uvIndex = document.getElementById('uvIndex');
        uvIndex.innerHTML = 'UV Index: ' + uv ;

        var uvColors = function(){
            if (uv < 3.00){
            uvIndex.setAttribute("class","low");
            console.log('low');
        } else if (uv < 6.00){
            uvIndex.setAttribute("class","mod");
            console.log('mod');
        } else if (uv < 8.00){
            uvIndex.setAttribute("class","high");
            console.log('high');
        } else if (uv < 11.00){
            uvIndex.setAttribute("class","vHigh");
            console.log('vhigh');
        } else if (12.01 < uv){
            uvIndex.setAttribute("class","extr");
            console.log('extr');
        }}
       ;

       uvColors();

    }) 
       ;

       

       //display city name, temp, hum, wind, UV in city-today div
        var responseContainerEl = document.querySelector('#city-today');
        responseContainerEl.innerHTML="";
        
        var displayCityName = document.createElement('h2');
        displayCityName.setAttribute("id","curCity");
        displayCityName.innerHTML = searchCity + ' ('+ today + ')' //+ response.list[0].weather.icon;
        responseContainerEl.appendChild(displayCityName);

        var locationIcon = document.querySelector('.weather-icon');
        locationIcon.getElementsByTagName("img")[0].src= 'http://openweathermap.org/img/wn/' + icon + '.png' ;

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

        var icon = response.list[0].weather[0].icon;
        var locationIcon = document.querySelector('.weather-icon1');
        locationIcon.getElementsByTagName("img")[0].src= 'http://openweathermap.org/img/wn/' + icon + '.png' ;

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

        var icon = response.list[6].weather[0].icon;
        var locationIcon = document.querySelector('.weather-icon2');
        locationIcon.getElementsByTagName("img")[0].src= 'http://openweathermap.org/img/wn/' + icon + '.png' ;

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

        var icon = response.list[12].weather[0].icon;
        var locationIcon = document.querySelector('.weather-icon3');
        locationIcon.getElementsByTagName("img")[0].src= 'http://openweathermap.org/img/wn/' + icon + '.png' ;

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

        var icon = response.list[18].weather[0].icon;
        var locationIcon = document.querySelector('.weather-icon4');
        locationIcon.getElementsByTagName("img")[0].src= 'http://openweathermap.org/img/wn/' + icon + '.png' ;

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

        var icon = response.list[24].weather[0].icon;
        var locationIcon = document.querySelector('.weather-icon5');
        locationIcon.getElementsByTagName("img")[0].src= 'http://openweathermap.org/img/wn/' + icon + '.png' ;

        var temperature5 = document.getElementById('card-temp5');
        var kelTemp5 = response.list[24].main.temp;
        var fTemp5 = Math.round((kelTemp5-273.15)*9/5+32) ;    
        temperature5.innerHTML = 'Temp: ' + fTemp5 + ' °F'
 
        var humidity5 = document.getElementById('card-hum5');
        var humid5 = response.list[24].main.humidity;
        humidity5.innerHTML = 'Humidity: ' + humid5 + '%';

        // add city name to ul city-list array

        var city = document.getElementById('city-list');
        city.innerHTML = " ";

        allCities.push(searchCity);

        localStorage.setItem("allCities", JSON.stringify(allCities));


        function displayStoredCities (){
            for (i=0; i < allCities.length; i++){
                
                var cityContainerEl = document.querySelector('#city-list');

                var cityList = document.createElement("li");
                cityList.setAttribute("id",i);
                var storedCities = JSON.parse(localStorage.getItem("allCities"));
                cityList.innerHTML = storedCities[i];
                cityContainerEl.appendChild(cityList);

            }

        };

        displayStoredCities();


        })};



