![Logo BePlug](assets/img/myLogo.png)
# ```Be</plug>```
_____

## Fonctionnalités (sections)
  * [home](#Home)
  * notifications
  * calendar
  * links
  * forums
  * chatbox
  * privateMsgs
  * usersON

_____

### Home
Summaries of the last updates :
* notifications
* calendar
* links
* forums

### Notifications
Short and important messages/notices sent to everybody
* logs + AJAX for "more..."
* notification = {exp:" ", title:" ", msg:" ", date:" "}

### Calendar
* event = {date:" ", hour:" ", title:" ", description:" ", exp:" "}
* display :
  - day
  - week
  - month

### Links
Useful links :
* link = {exp: " ", date:" ", category:" ", description:" ", link:" "}
* categories :
  - articles
  - documentation
  - tools

### Forums
### Chatbox
### PrivateMsgs
### UsersON

_____

## DataBase
* for every section except "home"
_____

## Problèmes rencontrés / découvertes
* prob de co après manip json => parce que nodemon redémarre
* readFile (non bloquant) / readFileSync (bloquant)
* récupérer le pseudo pour la déconnexion => need sessions
* section qui se vide quand display block => confusion backend: rq AJAX à chaque fois
