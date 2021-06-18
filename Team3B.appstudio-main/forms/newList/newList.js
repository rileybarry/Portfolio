let listID = ""
let userID = 1
let productID = ""

// reusable functions
function reloadListItems(listName) {
    query = "SELECT product_name FROM list_items LEFT JOIN lists ON list_items.listID = lists.listID LEFT JOIN products ON list_items.product_id = products.product_id WHERE list_name = '" + listName + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)

    if (req.status == 200) { 
        results = JSON.parse(req.responseText)
        if (results.length == 0)
            selShowList.addItem("No items")
        else { 
            selShowList.clear()
            for (i = 0; i < results.length; i++)
                selShowList.addItem(results[i])
        }
    } else
        console.log(`Error code: ${req.status}`)    
}

function getListID(listName, userId) {
    query = "SELECT listID FROM lists WHERE list_name = '" + listName + "' AND user_id = '" + userId + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    if (req.status == 200) { 
        results = JSON.parse(req.responseText)
        if (results.length == 0)
            console.log("No results")
        else { 
            return results[0]
        }
    } else
        console.log(`Error code: ${req.status}`) 
}


function getProductID(item) {
  query = "SELECT product_id FROM products WHERE product_name = '" + item + "'"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    if (req.status == 200) { 
        results = JSON.parse(req.responseText)
        if (results.length == 0)
            console.log("No results")
        else { 
            return results[0]
        }
    } else
        console.log(`Error code: ${req.status}`)     
}


function delItems(list, product) {
  query = "DELETE FROM list_items WHERE listID = '" + list + "' AND product_id = '" + product + "'"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    if (req.status == 200) { 
        if (req.responseText == 500) {    
            console.log("You have successfully deleted the product!")           
        } else
            console.log("There was a problem with deleting the product.")
    } else 
        console.log(`Error: ${req.status}`)
}


newList.onshow=function(){
    hmbrPageNavNewList.hidden = false
    
    // populate list dropdown
    query = "SELECT list_name FROM lists"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)

    if (req.status == 200) { 
        results = JSON.parse(req.responseText)
        if (results.length == 0)    
            console.log("There are no states in the database.")
        else {
            drpLists.clear()
            for (i = 0; i < results.length; i++)
                drpLists.addItem(results[i])
        }
    } else
        console.log(`Error code: ${req.status}`)
    
    // reload list items 
    selShowList.clear()
    reloadListItems(drpLists.value)
    
    // get list ID
    listID = getListID(drpLists.value, userID)
     
}


drpLists.onclick=function(s){
  if (typeof(s) == "object")   
      return                    
  else {  
      selShowList.clear()
      
      drpLists.value = s
      // reload list items
      reloadListItems(s)

      // get list ID
      listID = getListID(s, userID)       
    }
}


btnSubmit.onclick=function(){
  let newItem = inptAddItem.value  
  
  // get product ID
  productID = getProductID(newItem)
  
  // insert query
  query = "INSERT INTO list_items (`listID`,`product_id`) VALUES ('" + listID + "', '" + productID + "')"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    if (req.status == 200) { 
        if (req.responseText == 500) {    
            console.log("You have successfully added the product!")
            reloadListItems(drpLists.value)
            // inptAddItem.value.clear()
        } else
            console.log("There was a problem with adding the product to the database.")
    } else 
        console.log(`Error: ${req.status}`)
}


btnDelItems.onclick=function(){
    // get listID
    listID = getListID(drpLists.value, userID)
    console.log(typeof(selShowList.text))
    
    // delete selected items
    let delItem = ""
    if (typeof(selShowList.text) == "string") {
        delItem = selShowList.text
        productID = getProductID(delItem)
        delItems(listID, productID)
    } else {
        for (i = 0; i < selShowList.text.length; i++) {
            delItem = selShowList.text[i]
            productID = getProductID(delItem)
            delItems(listID, productID)
        }
    }
    
    // reload list
    selShowList.clear()
    reloadListItems(drpLists.value)
}


btnClearList.onclick=function(){
  // get listID
  listID = getListID(drpLists.value, userID)
  
  // clear items in DB
  query = "DELETE FROM list_items WHERE listID = '" + listID + "'"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + schema + "&query=" + query)
    if (req.status == 200) { 
        if (req.responseText == 500) {    
            console.log("You have successfully cleared the list!")
            selShowList.clear()
            reloadListItems(drpLists.value)            
        } else
            console.log("There was a problem with clearing the list.")
    } else 
        console.log(`Error: ${req.status}`)
}


hmbrPageNavNewList.onclick=function(s){
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