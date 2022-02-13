/**
 * définition des modules
 */
const express = require("express");
const bodyParser = require('body-parser');
const { addAbortSignal } = require("stream");
const user = require("./fake_data/user.json");
const firebase = require('firebase-admin');
// Setup firebase


const firebaseConfig = {
  apiKey: "AIzaSyAIpz0orlnGc7NAPm9R_zFUv5DwHq_-O_0",
  authDomain: "area-ed03e.firebaseapp.com",
  databaseURL: "https://area-ed03e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "area-ed03e",
  storageBucket: "area-ed03e.appspot.com",
  messagingSenderId: "237758254557",
  appId: "1:237758254557:web:41d4d8c18d6da76780fa34",
  measurementId: "G-M09FR9D9DY"
};

firebase.initializeApp(firebaseConfig)
let database = firebase.database()


const app = express();

/**
 * body parser
 */



const urlendocodeParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlendocodeParser);
app.use(bodyParser.json());

/**
 * def des CORS
 */


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// Route user : GET => Permet d'obtenir les infos de l'utilisateur (username, services, area, ect.)

app.get('/services', (req, res) => {
  if (req.header("bearer-token"))
    return res.status(200).json(user)  
  return res.status(400).json("invalid header : bearer-token")
})

app.get('/actions', (req, res) => {
  res.status(200).json("Toto")
})

/**
 * défini route hello
 */

app.get('/about.json', function(req, res) {
  let data = {};
  data.client={};
  data.client.host = req.ip;
  data.server = {};
  data.server.current_time = Date.now();
  data.server.services = [];
  data.server.services[0] = {name: "Google", widgets: [{name: "...", description: "...", params: [{name: "location", type:"strnig"}]}]}
  data.server.services[1] = {name: "Spotify", widgets: [{name: "...", description:"...", params: [{name:"movie", type:"string"}]}]}
  data.server.services[2] = {name: "Deezer", widgtes: [{name:"...", description: "...", parmas: [{name:"username", type:"string"}]}]}
  data.server.services[3] = {name: "...", widgtes: [{name:"...", description: "...", parmas: [{name:"name", type:"string"}]}]}
  data.server.services[4] = {name: "...", widgtes: [{name:"...", description: "...", parmas: [{name:"keyword", type:"string"}]}]}
  data.server.services[5] = {name: "...", widgtes: [{name:"...", description: "...", params: [{name:"value", type:"int"}]}]}
  res.json(data);
})

/**
 * def et mise en place du port
 */

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
