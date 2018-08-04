# Voting System (v1.0.0)
A Simple CRUD application created on MERN stack.
- RESTFul service architecture (**CORS** enabled).
- Using `jsonwebtoken` to secure end-points.
- Using `fawn` for transaction control.
## Interfaces
- **Normal user**
    Logs in and vote for a single candidate out of all listed candidates.
    This is a one time action and can not be altered.
- **Admin User**
    Logs in and can see all available candidates along with their vote counts.
    Has persmission to add a new candidate to the list.
- **_Candidates data is auto refreshed when user is logged-in every 5 seconds._**

## Installation
- `git clone https://github.com:chinmayapati/voting_system.git`
- `cd voting_system/voting_server`
- `npm install` (Install node app dependencies)
- `nvm use 10.6.0` (If **nvm** is not isntalled, set node version value to **10.6.0** manually)
- `cd ../ && npm install` (Install react app dependencies)

## Run
- `export DEBUG=voting:* jwt={YOUR_PRIVATE_STRING}` (Don't set **DEBUG** if console logs are not requried)
- `cd voting_system/voting_server`
- `node app.js` (It will start the node app. Make sure **port 3001** is enabled)
- `cd ../ && npm run start` (It will start the react app and open in browser)

## Misc
- **Adding new user**
    - Start the node server.
    - Install and open **postman** or any other REST client.
    - **POST** request to **http://localhost:3001/users/signup** with following fields [name, email, password, isAdmin (optional, default=false)]

## Hugs or Bugs
**[chinmaya.cp@gmail.com](mailto:chinmaya.cp@gmail.com)**
