![Logo BePlug](assets/img/myLogo.png)
# ```Be</plug>```
This application aims to optimize communication and information sharing at BeCode.
_____

## Features (sections)
  * [Home](#home)
  * [Notifications](#notifications)
  * [Calendar](#calendar)
  * [Links](#links)
  * [Forums](#forums)
  * [Chatbox](#chatbox)
  * [PrivateMsgs](#privateMsgs)
  * [UsersON](#usersON)

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
* ```sendNotif()```
### Calendar
* event = {date:" ", hour:" ", title:" ", description:" ", exp:" "}
* display :
  - day
  - week
  - month
* ```addEvent()```

### Links
Useful links :
* link = {exp: " ", date:" ", category:" ", description:" ", link:" "}
* categories :
  - articles
  - documentation (by language?)
  - tools
* ```addCategory()```
* ```addLink()```

### Forums
Discussions, mutual help, ...
* message = {exp:" ", date:" ", category:" ", topic:" ", msg:" "}
* ```addCategory()```
* ```addTopic()```
* ```addMsg()```

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
