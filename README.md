# express-JWT-boilerplate
Express-based JWT API Boilerplate with User Login and Signup, Get User Info and Delete User

## About
Whilst working on other projects, I usually found myself having to write user login/signup logic so I created a boilerplate to
speed things up. I made this one with simplicity in mind as a lot of API Boilerplates for user management seemed too complex for my
use cases.

## Install 
```
git clone https://github.com/dmdxv/express-JWT-boilerplate.git
```
```
npm install
```
```
node app / nodemon app
```
You will need a mongoDB instance running for storing user credentials.
## Routes
### Base URL
```
/api/users/
```

### Signup
```
/signup
```
Takes a username and password from req.body, checks if username already exists and if not creates a new user. Returns either a 200 status
for success or 500 status for error

### Login
```
/login
```
Takes a username and password from req.body, finds user in database, checks passwords match with bcrypt, if success returns a 200 status
with JWT Token. 

### Get User (requires JWT Token)
```
/info/:username
```
Takes username from req.params, checks if JWT Token is authentic, if successful returns a 200 status with user's username and "User found"
message

### Delete User (requires JWT Token)
```
/delete/:userID
```
Takes userID from req.params, checks if JWT Token is authentic, if successful deletes user and returns a 200 status with "User deleted 
successfully"

## Postman 
[![Image from Gyazo](https://i.gyazo.com/cc1953013e961e3c2024594cfb260bf5.png)](https://gyazo.com/cc1953013e961e3c2024594cfb260bf5)

Example on how to send JWT Token with Postman

## Useful Links
[AcadeMind Tutorials](https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q)
