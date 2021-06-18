let req = {}
let query = ''
let results = []
let pw = 'Speedyrwb645'  // ***** put your database password here
let netID = 'rwb12128'
let databaseSchema = "375groupb3"  // group schema

let checkUser = ''
let userIndex = ''

let checkPW = ''
let passwordIndex = ''

btnLogin.onclick=function(){
    query = "SELECT username FROM account;"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + databaseSchema + "&query=" + query)
    resultsUser = JSON.parse(req.responseText)
    
    let user = inptUser.value
    
      if (req.status == 200) { //everything worked.
        for (i = 0; i < resultsUser.length; i ++) {
          if (user == resultsUser[i]) {
            console.log('this user exists')
            checkUser = 1
            userIndex = i
            break
          } else {
            checkUser = 0
          }
        //ends loop to check username
      }
    } else {
        //Handle that. 
        console.log('failure user')
    }
      
    query = "SELECT password FROM account;"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + databaseSchema + "&query=" + query)
    resultsPW = JSON.parse(req.responseText)
    
    let passWord = inptPassword.value
    
    if (req.status == 200) { //everything worked.
      for (i = 0; i < resultsPW.length; i ++) {
        if (passWord == resultsPW[i]) {
          console.log('this pw exists')
          checkPW = 1
          passwordIndex = i
          break
        } else {
          checkPW = 0
        }
        //ends loop to check password
      }        
    } else {
      //Handle that. 
      console.log('failure user')
    }
      
    if ((checkUser && checkPW == 1) && (userIndex == passwordIndex)) {
      console.log('user and pw are in db')
      ChangeForm(yourLists)
    } else {
      console.log('the user and pw do not match')
    }
}

btnAccount.onclick=function(){
  ChangeForm(createAccount)
}
