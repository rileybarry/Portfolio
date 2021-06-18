
grocStores = ["Walmart","Hy-Vee: Broadway","ALDI: N 30th","Family Dollar: S 24th","ALDI: S 72nd","Family Dollar: 16th","Hy-Vee: Cass","Family Dollar: N 24th","Trader Joe's"]



//Declared arrays for markers
lat = [41.2626004, 41.261463, 41.3024318, 41.2512087, 41.2520613, 41.21445370000001, 41.2831746, 41.265507, 41.2482854]
lon = [-95.9811922, -95.879364, -95.9559953, -95.94750669999999, -96.0222567, -95.95798689999999, -95.9370907, -96.03931999999999, -96.0739732]

//API call
// 1. *** use your own url copied from Postman ****
let requestURL2 = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=grocery store &key=AIzaSyDoaVtASvuYckCYDer224otaiYRZApFXiw&location=41.265331,-95.949364&radius=1000&type=grocery_or_supermarket"
var Groc= []
let apiData2 = ""
let message2 = ""

function onXHRLoad2() {
    let message2 = ""
    
    // 'this' is another name for the object returned from the API call
    let apiData2 = JSON.parse(this.responseText)
    
    for (i = 0; i <= apiData2.results.length - 1; i++) {
     Groc[i] = {  
       "description": apiData2.results[i].name,
       "lat":apiData2.results[i].lat,
       "lng":apiData2.results[i].lng,
       "address":apiData2.results[i].formatted_address
       }
       console.log(`${apiData2.results[i].formatted_address}`)
        message2 = message2 + apiData2.results[i].formatted_address + "\n" + apiData2.results[i].name + "\n" + "\n" 
    }
    
    
    // 2. *** put your textarea control name here ****
    txtaLocation2.value = message2
    
    // if want to add to database call a function here that does that
    // addToDatabase()
}

function callAPI2(URL) {
    var xhttp = new XMLHttpRequest();
    
    // if you need cors (you'll get a cors error if you don't have it and you need it)
    // use this code to add the cors code to your url 
    xhttp.open('GET', 'https://cors.bridged.cc/' + requestURL2)
    
    // if you DON'T need cors use this code:
    //xhttp.open('GET',URL)
    
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
    xhttp.addEventListener('load', onXHRLoad2)
    xhttp.send()
}

// 3. *** add a new button onclick event and put the callAPI code into it ***


btnLocation2.onclick=function(){
   // call the code that will make the API call, then process what comes back
    callAPI2(requestURL2)
}


/////////////////////////////////////////////////////////////////////////////////////////

//Add to select
REAL_GOOGLE_API.onshow=function(){
  drpLocation.clear()   
    // put array of flavors in the dropdown (called populating it)
    for (i = 0; i < myPlaces.length; i++) 
        drpLocation.addItem(myPlaces[i].name)
        
}
 

// multiple list choices allowed; uses button onclick
// Comment code above, and uncomment code below





/////////////////////////////////////////////////////////////////////////////

myPlaces = [
              {name: "Walmart Neighborhood Market: 360 Saddle Creek Rd",lat:41.2626004,lon:-95.9811922,category: 1},
              {name: "Hy-Vee: 2323 W Broadway, Council Bluffs",lat:41.261463,lon:-95.879364,category: 2},
              {name: "ALDI: 4801 N 30th St",lat:41.3024318,lon:-95.9559953,category: 3},
              {name: "Family Dollar: 834 S 24th St",lat:41.2512087,lon:-95.94750669999999,category: 4},
              {name: "ALDI: 885 S 72nd St",lat:41.2520613,lon:-96.0222567,category: 5},
              {name: "Family Dollar: 2601 N 16th St",lat:41.21445370000001,lon:-95.95798689999999,category: 6},
              {name: "Family Dollar: 1500 N 24th St",lat:41.2831746,lon:-95.9370907,category: 7},
              {name: "Hy-Vee: 7910 Cass St",lat:41.265507,lon:-96.03931999999999,category: 8},
              {name: "Trader Joe's: 10305 Pacific St",lat:41.2482854,lon:-96.0739732,category: 9,}
            ]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var marker
var infowindow
var currentLat, currentLong

function gotLocation(location, lat, long) {

    gmLocations2.mapOptions.latitude = location.coords.latitude
    gmLocations2.mapOptions.longitude = location.coords.longitude
    
    currentLat22 =location.coords.latitude
    currentLong22 = location.coords.longitude
    console.log(`lat and long are ${currentLat22} and ${currentLong22}`)
    gmLocations2.refresh()

    //Put a marker on our location
     
    point1 = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
    marker1 = gmLocations2.setMarker({
        label: point1,
        title: "My Location"    // hover by balloon tip tooltip name
        })
  const infowindow = new google.maps.InfoWindow({
    content: "My Location"
  })     
 marker1.addListener("click", () => {
    infowindow.open(gmLocations2, marker1);
  })
  
  
}
  
    //Dropdown to choose location
  
 
drpLocation.onclick = function(s){
//loop of myPlaces to put markers on
   let tempPoint = ""
    let tempMarker = ""  
   
   for (i = 0; i < myPlaces.length;i++) {
        if (typeof(s) == "object") {
       
       return
      
      } else if (drpLocation.selection == myPlaces[i].name){
         
           tempPoint = new google.maps.LatLng(myPlaces[i].lat,myPlaces[i].lon)
      tempMarker = gmLocations2.setMarker({
        position: tempPoint,
        title: myPlaces[i].name
     }) 
    
    const infowindow = new google.maps.InfoWindow({
    content: myPlaces[i].name
  })     
 
 tempMarker.addListener("click", () => {
    infowindow.open(gmLocations2, tempMarker);
  });
        
}
}  
    }

   
   
   

btnCL42.onclick = function() {
    // have to run this before you do anything else - call this getLocation button
    navigator.geolocation.getCurrentPosition(gotLocation)
    NSB.WaitCursor(true)
}





btnClear2.onclick=function(){
  gmLocations2.refresh()
}








hmbMenu3.onclick=function(s){
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
        case "Recipe":
            ChangeForm(recipeApi)
            break;
        }
    }  
}

