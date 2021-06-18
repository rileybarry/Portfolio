createAccount.onshow=function(){
  lblUserWarning.hidden=True
}

btnCreateAcc.onclick = function() {
  query = "SELECT username FROM account;"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + databaseSchema + "&query=" + query)
  resultsUser = JSON.parse(req.responseText)

  let newUser = inptCreateUser.value
  let newPassOne = inptPassOne.value
  let newPassTwo = inptPassTwo.value

  if (req.status == 200) { //everything worked.
    for (i = 0; i < resultsUser.length; i++) {
      if (newUser == resultsUser[i]) {
        console.log('this user exists')
        checkUser = 1
        // userIndex = i
        lblUserWarning.hidden=False
        break
      } else {
        checkUser = 0
      }
      //ends loop to check username
    }
  }  else {
    //Handle that. 
    console.log('failure user')
  }
  
  if ((checkUser == 0) && (newPassOne == newPassTwo)) {
    console.log('second loop worked')
    
    query = "INSERT INTO account (username, password) VALUES ('" + newUser + "', '" + newPassOne + "');"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + databaseSchema + "&query=" + query)
  }  
  if (req.status == 200) {
    console.log('the username and password were added')
    ChangeForm(Login)
  } else {
    console.log('the ajax failed')
  }
}