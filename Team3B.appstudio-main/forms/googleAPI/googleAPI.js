//Array with call from Postman
grocStores = ["Walmart: 360 Saddle Creek Rd, Omaha, NE","Hy-Vee: 2323 W Broadway, Council Bluffs, IA","ALDI: 4801 N 30th St, Omaha, NE","Family Dollar: 834 S 24th St, Omaha, NE","ALDI: 885 S 72nd St, Omaha, NE","Family Dollar: 2601 N 16th St, Omaha, NE","Hy-Vee: 7910 Cass St, Omaha, NE","Family Dollar: 1500 N 24th St, Omaha, NE","Trader Joe's: 3552 Leavenworth St, Omaha, NE"]



//Declared arrays for markers
lat = [41.2626004, 41.261463, 41.3024318, 41.2512087, 41.2520613, 41.21445370000001, 41.2831746, 41.265507, 41.2482854]
lon = [-95.9811922, -95.879364, -95.9559953, -95.94750669999999, -96.0222567, -95.95798689999999, -95.9370907, -96.03931999999999, -96.0739732]

//API call
// 1. *** use your own url copied from Postman ****
let requestURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=grocery store &key=AIzaSyDoaVtASvuYckCYDer224otaiYRZApFXiw&location=41.265331,-95.949364&radius=2000&type=grocery_or_supermarket &maxprice=10"

function onXHRLoad() {
    let message = ""
    
    // 'this' is another name for the object returned from the API call
    let apiData = JSON.parse(this.responseText)
    
    for (i = 0; i <= apiData.results.length - 1; i++) {
        console.log(`${apiData.results[i].formatted_address}`)
        message = message + apiData.results[i].formatted_address + "\n" + apiData.results[i].name + "\n" + "\n" 
    }
    
    // 2. *** put your textarea control name here ****
    txtaLocation.value = message
    
    // if want to add to database call a function here that does that
    // addToDatabase()
}

function callAPI(URL) {
    var xhttp = new XMLHttpRequest();
    
    // if you need cors (you'll get a cors error if you don't have it and you need it)
    // use this code to add the cors code to your url 
    xhttp.open('GET', 'https://cors.bridged.cc/' + requestURL)
    
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
    xhttp.addEventListener('load', onXHRLoad)
    xhttp.send()
}

// 3. *** add a new button onclick event and put the callAPI code into it ***


btnLocation.onclick=function(){
   // call the code that will make the API call, then process what comes back
    callAPI(requestURL)
}






//Add to select
googleAPI.onshow=function(){
  selLoc.clear()   
    // put array of flavors in the dropdown (called populating it)
    for (i = 0; i < grocStores.length; i++) 
        selLoc.addItem(grocStores[i])
}
 

// multiple list choices allowed; uses button onclick
// Comment code above, and uncomment code below

btnFavLoc.onclick=function(){
  // returns array of the choices' text
    let message = "You chose:"
  for (i = 0; i < selLoc.text.length; i++)
     message = message + "\n" + selLoc.text[i] + " \n" + "\n" 
     
  // remove the last comma
  // slice drops last 2 characters (comma and space)
  //     starts at 0, and goes to end of the 
  //     string minus 2 characters
  message = message.slice(0, -2)
  txtaLocation.value = message



}

////////////////////////////////////////////Need to add markers into select//////////////////////////////////

myPlaces = [
              {name: "Walmart Neighborhood Market",lat:41.2626004,lon:-95.9811922},
              {name: "Hy-Vee",lat:41.261463,lon:-95.879364},
              {name: "ALDI",lat:41.3024318,lon:-95.9559953},
              {name: "Family Dollar",lat:41.2512087,lon:-95.94750669999999},
              {name: "ALDI",lat:41.2520613,lon:-96.0222567},
              {name: "Family Dollar",lat:41.21445370000001,lon:-95.95798689999999},
              {name: "Family Dollar",lat:41.2831746,lon:-95.9370907},
              {name: "Hy-Vee",lat:41.265507,lon:-96.03931999999999},
              {name: "Trader Joe's",lat:41.2482854,lon:-96.0739732}
            ]

var marker
var infowindow
var currentLat, currentLong

function gotLocation(location, lat, long) {

    gmLocations.mapOptions.latitude = location.coords.latitude
    gmLocations.mapOptions.longitude = location.coords.longitude
    
    currentLat22 =location.coords.latitude
    currentLong22 = location.coords.longitude
    console.log(`lat and long are ${currentLat22} and ${currentLong22}`)
    gmLocations.refresh()

    //Put a marker on our location
    point1 = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
    marker1 = gmLocations.setMarker({
        position: point1,
        title: "My Location"    // hover by balloon tip tooltip name
    })
    //All hard-coded below, but the loop takes care of it
    /*
   //Walmart
    point2 = new google.maps.LatLng(41.2626004, -95.9811922);
    marker2 = gmLocations.setMarker({
        position: point2,
        title: "Walmart Neighboorhood Market"
    });

    //Hyvee
    point3 = new google.maps.LatLng(41.261463, -95.879364);
    marker3 = gmLocations.setMarker({
        position: point3,
        title: "Hy-Vee"
    });

    //Family Dollar
    //loop possibility
    point4 = new google.maps.LatLng(41.2512087, -95.94750669999999);
    marker4 = gmLocations.setMarker({
        position: point4, 
        title: "Family Dollar"
    });
     //Aldi
    point5 = new google.maps.LatLng(41.3024318, -95.9559953);
    marker5 = gmLocations.setMarker({
        position: point5,
        title: "Aldi" 
        });
        
         //ALDI
    point6 = new google.maps.LatLng(41.2520613, -96.0222567);
    marker6 = gmLocations.setMarker({
        position: point6,
        title: "Aldi"
        });
          //"Family Dollar"
    point7 = new google.maps.LatLng(41.21445370000001, -95.95798689999999);
    marker7 = gmLocations.setMarker({
        position: point7,
        title: "Family Dollar"
        });
          //"Family Dollar"
    point8 = new google.maps.LatLng(41.2831746, -95.9370907);
    marker8 = gmLocations.setMarker({
        position: point8,
        title: "Family Dollar"
        });
          //, "Hy-Vee"
    point9 = new google.maps.LatLng(41.265507, -96.03931999999999);
    marker9 = gmLocations.setMarker({
        position: point9,
        title: "Hy-Vee"
        });
          //, "Trader Joe's
    point10 = new google.maps.LatLng(41.2482854, -96.0739732);
    marker10 = gmLocations.setMarker({
        position: point10,
        title: "Trader Joe's"
      });
*/

//loop of myPlaces to put markers on

    
    let tempPoint = ""
    let tempMarker = ""
    for (i = 0; i < myPlaces.length;i++) {
      tempPoint = new google.maps.LatLng(myPlaces[i].lat,myPlaces[i].lon)
      tempMarker = gmLocations.setMarker({
        position: tempPoint,
        title: grocStores[i]
      })
    }
}


btnCL4.onclick = function() {
    // have to run this before you do anything else - call this getLocation button
    navigator.geolocation.getCurrentPosition(gotLocation)
    NSB.WaitCursor(true)
}


btnBackMenu.onclick=function(){
  ChangeForm(yourLists)
}

