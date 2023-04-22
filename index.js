const express = require('express');
const bodyParser = require('body-parser');
const user = require('./in2');
const path = require("path");
const jwt = require("jsonwebtoken");
// const http = require('http');
const app = express();
var cors = require('cors');

const { io } = require("socket.io-client");

var allowlist = ['https://mrinmoymondalreal-automatic-fortnight-jww5qxvq9q52pv64-3000.preview.app.github.dev']

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

var keys = [];

const soc = io.connect("https://credsafe.server.mrinmoymondal.ml");
soc.emit("join_id", {token:"f9442b41-31cc-4cbe-8c92-1d588b992cba", user_id: "f9442b41-31cc-4cbe-8c92-1d588b992cba"});
soc.on("join_id", (d)=>{console.log(d)})
soc.on("keys", (d)=>{

  keys.push(d);
})

const PORT = process.env.PORT || 3000;
// const server = http.createServer(app);
const JWT_TOKEN = "JWT_TOKEN";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/signup", (req, res)=>{
  res.sendFile(path.join(__dirname, "frontend2/signup.html"));
});
app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "frontend2/index.html"));
});
app.get("/login", (req, res)=>{
  res.sendFile(path.join(__dirname, "frontend2/login.html"));
});


app.post('/a/signup', async (req, res)=>{
  const { name, password, email, id } = req.body;
  
  try{
    const f = await user.add(name, email, password, id);
    const fetch = require('node-fetch');
    if(f.status == 200) {
      var g = await fetch('https://credsafe.server.mrinmoymondal.ml/confirm', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              status: 1,
              user_id: "f9442b41-31cc-4cbe-8c92-1d588b992cba",
              id: id,
              password: "12345678"
          })
      });
      console.log(id);
      g = await g.json();
      if(g.status == 200){
        res.status(f.status).send(f)
      }else{
        res.status(400).send({ status: 400, data: "unexpected Problem" });
      }
    }else{
      res.status(f.status).send(f);
    }
  }catch(err){
    console.log(err);
    res.status(500).send({data: 'internal server error'});
  }
});

app.post('/a/login', async (req, res)=>{
  var flag = 0, data;
  for(var i = 0;i < keys.length;i++){
    console.log(keys[i]);
    try{
      data = (jwt.verify(req.body.id, keys[i]))
      if(data.id) {
        var f = await user.log({ id: data.id });
        if(f.status == 200) {
          data = jwt.sign(f.data, JWT_TOKEN);
          console.log(data);
          break;
        }
      }
    }catch(err){
      flag = 0;
    }
  }
  
  if(data){
    res.setHeader("set-cookie", "token="+data+";");
    res.send({ status: 200, data });
  }else{
    res.send({ status: 400 });
  }
  
});

app.listen(PORT, (e)=>{
  console.log("Working ON", `http://localhost:${PORT}`);
});