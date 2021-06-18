
// 1. *** use your own url copied from Postman ****
let requestURL5 = "https://traderjoeapi.jackgisel.com/api/recipes"
function onXHRLoad5() {
    let message5 = ""
    // ‘this’ is another name for the object returned from the API call
    let apiData5 = JSON.parse(this.responseText)
    for (i = 0; i <= apiData5[2].ingredients.length - 1; i++) {
        console.log(`${apiData5[2].ingredients[i]}`)
        message5 = message5 + apiData5[2].ingredients[i] + "\n" + "\n"
    }
    

    
    
    
 //   console.log(pm.response.json()[2].ingredients)
    // 2. *** put your textarea control name here ****
    txtaIngredients.value = message5
    // if want to add to database call a function here that does that
    // addToDatabase()
}
function callAPI5(URL) {
    var xhttp = new XMLHttpRequest();
    // if you need cors (you’ll get a cors error if you don’t have it and you need it)
    // use this code to add the cors code to your url
   // xhttp.open(‘GET’, ‘https://cors.bridged.cc/’ + requestURL)
    // if you DON’T need cors use this code:
    xhttp.open('GET',URL)
    
    /* Headers */
    // if you need to set the returned data type, use this line of code:
    //xhttp.setRequestHeader(‘Content-Type’, ‘application/json’)
    // if you need authorization token (stored in myToken) use this line of code:
    // xhttp.setRequestHeader(‘Authorization’, ‘Bearer ’ + myToken)
    // if you need a key and it’s not in the url use code in one of the following
    // examples (think of headers as parameters)
    // or just use the Postman url which has all the parameters already added like I did here.
    // Here are headers you might need:
    /*
    xhttp.setRequestHeader(‘key’,‘AIzaSyCE-pjULPU_Gp5Qf0qL39tVsdJBX55J0cY’)
    xhttp.setRequestHeader(‘location’,‘41.276900,-95.942310’)
    xhttp.setRequestHeader(‘rankby’,‘distance’)
    xhttp.setRequestHeader(‘type’,‘restaurant’)
    */
    
    // make the API request
    xhttp.addEventListener('load', onXHRLoad5)
    xhttp.send()
}
// 3. *** add a new button onclick event and put the callAPI code into it ***
btnIngredients.onclick=function(){
      // call the code that will make the API call, then process what comes back
    callAPI5(requestURL5)
}


recipeApi.onshow=function(){
  alrtList.value = "Add these ingredients to your list!"
}




btnTJ.onclick=function(){

name = inptTJ.value
    price = inptType.value
    store_id = 3
    query = "INSERT INTO products (`product_name`,`price`,`store_id`) VALUES ('" + name + "', '" + price + "', '" + store_id + "')"
    // look at how the query is rendered
    alert(query)
    
    // replace my netID with yours (2 places)
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    if (req.status == 200) {
        if (req.responseText == 500)    // for our server - this means the insert succeeded
            console.log("You have successfully added the ingredient!")
        else
             console.log("There was a problem with adding the ingredient to the database.")
    } else 
        // transit error
        console.log("Error: " + req.status)
}



hbgrPageRecipeYourList.onclick=function(s){
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
            ChangeForm(googleAPI)
            break;
        case "Weather":
            ChangeForm(Weather)
            break;
        case "Recipe":
            ChangeForm(recipeAPI)
            break;
        }
    }  
}
let requestURL6 = "https://traderjoeapi.jackgisel.com/api/recipes"

function onXHRLoad6() {
    let message6 = ""
    // ‘this’ is another name for the object returned from the API call
    let apiData6 = JSON.parse(this.responseText)
    for (i = 0; i <= apiData6[2].title.length - 1; i++) {
        console.log(`${apiData6[2].title[i]}`)
        message6 = message6 + apiData6[2].title[i] + "\n" + "\n"
    }
    
    
    
    
 //   console.log(pm.response.json()[2].ingredients)
    // 2. *** put your textarea control name here ****
    lblTitle.value = message6
    // if want to add to database call a function here that does that
    // addToDatabase()
}
function callAPI6(URL) {
    var xhttp = new XMLHttpRequest();
    // if you need cors (you’ll get a cors error if you don’t have it and you need it)
    // use this code to add the cors code to your url
   // xhttp.open(‘GET’, ‘https://cors.bridged.cc/’ + requestURL)
    // if you DON’T need cors use this code:
    xhttp.open('GET',URL)
    
    /* Headers */
    // if you need to set the returned data type, use this line of code:
    //xhttp.setRequestHeader(‘Content-Type’, ‘application/json’)
    // if you need authorization token (stored in myToken) use this line of code:
    // xhttp.setRequestHeader(‘Authorization’, ‘Bearer ’ + myToken)
    // if you need a key and it’s not in the url use code in one of the following
    // examples (think of headers as parameters)
    // or just use the Postman url which has all the parameters already added like I did here.
    // Here are headers you might need:
    /*
    xhttp.setRequestHeader(‘key’,‘AIzaSyCE-pjULPU_Gp5Qf0qL39tVsdJBX55J0cY’)
    xhttp.setRequestHeader(‘location’,‘41.276900,-95.942310’)
    xhttp.setRequestHeader(‘rankby’,‘distance’)
    xhttp.setRequestHeader(‘type’,‘restaurant’)
    */
    
    // make the API request
    xhttp.addEventListener('load', onXHRLoad6)
    xhttp.send()
}
// 3. *** add a new button onclick event and put the callAPI code into it ***
btnIngredients.onclick=function(){
      // call the code that will make the API call, then process what comes back
    callAPI6(requestURL6)
    callAPI5(requestURL5)
}

