# Full Stack Web App With React and Sequelize Rest API

## Build status

Completed 01/08/2021

## Language / Framework

Node.js

Express.js

SQL/sequelize

React.js

CSS/HTML

## Features
A full stack app created with React and a rest api programed using express and node.js

The app mimics an online database of courses and users.

### The rest API provides the database containing information about users and courses. Users can be created and then authenticated and courses can be retrieved, created, updated and deleted.

- bcrypt is used to hash passwords
- Basic authentication is used
- Sequelize models are used to validate submitted information
- Course create, update and delete as well us GET user are all protected routes requiring authentication
- CORS has been enabled

### The React front end provides a user interface to allow easy communication with the api and database

- Error handling has been created to provide users with clear indications as to what has gone wrong (inc NotFound, Forbidden and Error components)
- Most Error handling does not redirect the user so that they maintain there current URL- this has been done for UX so that they can see what it is they searched for
- Form validation has been created for Sign Up, Create Course and Update Course pages
- A show password icon has been created for users to easily show or hide there passwords
- React Context has been used for all api call functions as well as keeping the state of the authenticated user
- Course data is kept lower down in either the Course or Courses component as the data is independent and not used elsewhere

## Installation

Download product files and unzip.

### To get API running: (do all action in "api" folder)
- Run npm install 
- Run npm run seed 
- Run npm start

### To get API running: (do all action in "client" folder)
- Run npm install 
- Run npm start

To login and edit current courses use credentials
- username: joe@smith.com
- password: joepassword

Otherwise create a new user and courses in order to test the app.

View finished project at http://localhost:3000

## Tests and browser compatibility

As of Aug 2021. no console errors or bugs are reported.

Tested and working.

## Contribute
Feel free to download and use files / code 

## Credits
TreeHouse - provided seed file

Harrison Peace