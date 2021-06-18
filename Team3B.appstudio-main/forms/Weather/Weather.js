//let requestURL = "https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&latitude=41.265331&longitude=-95.949364&oneobservation=true&apiKey=neI3W2HLFk6JHyYJhOVr6hwWC9yueo0phoG2Sc7Tqbg"
//let requestURL = "https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&name=Omaha&apiKey=neI3W2HLFk6JHyYJhOVr6hwWC9yueo0phoG2Sc7Tqbg"
//let lon = -95.949364
let city = ' '
let requestURLWeather = " "

function onXHRLoad() {
 
    
    // 'this' is another name for the object returned from the API call
    let apiData = JSON.parse(this.responseText)
    
    
    // 2. *** put your textarea control name here ****
    txtaWeather.value = `Current time is ${apiData.current.observation_time},  temperature is ${apiData.current.temperature}℉.`
    
    // if want to add to database call a function here that does that
    // addToDatabase()
}

function callAPI(URL) {
    var xhttp = new XMLHttpRequest();
    
    // Cors
    //xhttp.open('GET', 'https://cors.bridged.cc/' + requestURLWeather)
    
    // Without Cors
    xhttp.open('GET',URL)
    
    /* Headers */
    // if you need to set the returned data type, use this line of code: 
    //xhttp.setRequestHeader('Content-Type', 'application/json')
    
    // if you need authorization token (stored in myToken) use this line of code: 
    // xhttp.setRequestHeader('Authorization', 'Bearer ' + myToken)
    
    // if you need a key and it's not in the url use code in one of the following
    // examples (think of headers as parameters)
    // or just use the Postman url which has all the parameters already added like I did here. 
    
    
    // Here are headers you might need: 
    /*
    xhttp.setRequestHeader('key','AIzaSyCE-pjULPU_Gp5Qf0qL39tVsdJBX55J0cY')
    xhttp.setRequestHeader('location','41.276900,-95.942310')
    xhttp.setRequestHeader('rankby','distance')
    xhttp.setRequestHeader('type','restaurant')
    */

    // make the API request
    xhttp.addEventListener('load', onXHRLoad)
    xhttp.send()
}

// 3. *** add a new button onclick event and put the callAPI code into it ***





btnWeatherLocation.onclick=function(){
 // call the code that will make the API call, then process what comes back
// requestURL = "http://api.weatherstack.com/current?access_key=fb51579f117a071c9b7c0c58dccf9f4a&query=" + city + "&units=f"
 requestURL = "http://api.weatherstack.com/current?access_key=fb51579f117a071c9b7c0c58dccf9f4a&query=Omaha&units=f"

    callAPI(requestURL)
  
}

btnMenu.onclick=function(){
  ChangeForm(menu)
}

inptCity.onclick=function(){
city = inptCity.value
query = " "
}


hbrWeatherLocation.onclick=function(s){
    if (typeof(s) == "object") {
       return
    } else {
       switch(s) {
        case "Home":
            ChangeForm(yourLists)
            break;
        case "View Lists":
            ChangeForm(yourLists)
            break;
        case "Add to Current List":
            ChangeForm(newList)
            break;            
        case "Nearby Stores":
            ChangeForm(REAL_GOOGLE_API)
            break;
        case "Weather":
            ChangeForm(Weather)
            break;
        case "Random Recipe":
            ChangeForm(recipeApi)
            break;
        }
    } 
}
