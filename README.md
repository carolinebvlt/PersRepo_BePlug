![Logo BePlug](assets/img/myLogo.png)
# ```Be</plug>```
This application aims to optimize communication and information sharing at BeCode.

*Created with NodeJS*
_____

## Features (sections)
  * [Registration](#registration)
  * [Home](#home)
  * [Notifications](#notifications)
  * [Calendar](#calendar)
  * [Links](#links)
  * [Forums](#forums)
  * [Chatbox](#chatbox)
  * [PrivateMsgs](#privateMsgs)
  * [Users](#users)

_____

### Registration
* user = {lastName:" ", firstName:" ", pseudo:" ", startup:" "}
* ```addUser()```
* ```updateUser()```
* ```deleteUser()```


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
* ```updateEvent()```
* ```deleteEvent()```


### Links
Useful links :
* link = {exp: " ", date:" ", category:" ", description:" ", link:" "}
* categories :
  - articles
  - documentation (by language?)
  - tools
* ```addCategory()```
* ```addLink()```
* ```updateLink()```
* ```deleteLink()```

### Forums
Discussions, mutual help, ...
* message = {exp:" ", date:" ", category:" ", topic:" ", msg:" "}
* ```addCategory()```
* ```addTopic()```
* ```addMsg()```
* ```updateMsg()```
* ```deleteMsg()```

### Chatbox
* notification = {exp:" ", msg:" ", date:" "}
* ```sendMsg()```

### PrivateMsgs
* notification = {exp:" ", rec:" ", msg:" ", date:" "}
* ```sendMsg()```

### Users
* users ON
* all the users (by startup?)
_____

## DataBase
* for every section except "home"
