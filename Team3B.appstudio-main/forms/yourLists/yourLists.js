let schema = "375groupb3"

yourLists.onshow=function(){   
  hbgrPageNavYourList.hidden = false
  
  query = "SELECT list_name FROM lists"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)

  if (req.status == 200) { 
    results = JSON.parse(req.responseText)
    if (results.length == 0)    
       console.log("There are no customers in the database.")
   else { 
       rdoLists.clear()
       for (i = 0; i < results.length; i++)
           rdoLists.addItem(results[i])
    }
  } else
      console.log(`Error code: ${req.status}`)   
}

btnDeleteList.onclick=function(){
    let customerDelete = $("input[name=rdoLists]:checked").prop("value")
    query = "DELETE FROM lists WHERE list_name = '" + customerDelete + "'"      
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    
      if (req.status == 200) {
            if (req.responseText == 500) {    
                console.log(`You have successfully deleted the customer named ${customerDelete}`)
                
                query = "SELECT list_name FROM lists"
                req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)

                if (req.status == 200) { 
                    results = JSON.parse(req.responseText)
                    if (results.length == 0)    
                       console.log("There are no customers in the database.")
                    else { 
                       rdoLists.clear()
                       for (i = 0; i < results.length; i++)
                           rdoLists.addItem(results[i])
                    }
                } else
                    console.log(`Error code: ${req.status}`)
                
            } else
                console.log(`There was a problem deleting ${customerDelete} from the database.`)
      } else
            console.log(`Error: ${req.status}`)
}


// declare global variable
let newListName = ""

btnAddList.onclick=function(){
    newListName = inptNewListName.value
    //let listUserID = Math.floor(Math.random() * 101)
    query = "INSERT INTO lists (`list_name`,`user_id`) VALUES ('" + newListName + "', '" + userID + "')"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    if (req.status == 200) { 
        if (req.responseText == 500)    
            console.log("You have successfully added the customer!")
        else
            console.log("There was a problem with adding the customer to the database.")
    } else 
        console.log(`Error: ${req.status}`)
    
    ChangeForm(newList)
    drpLists.value = newListName
}

// declare global variable
let selectValue = ""

btnSelList.onclick=function(){
    selectValue = $("input[name=rdoLists]:checked").prop("value")
    drpLists.value = selectValue
    
    ChangeForm(newList)
}


hbgrPageNavYourList.onclick=function(s){
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
