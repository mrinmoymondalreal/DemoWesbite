const express = require('express');
const bodyParser = require('body-parser');
const user = require('./driver/user_control');
const path = require("path");
const jwt = require("jsonwebtoken");
// const http = require('http');
const app = express();

const { io } = require("socket.io-client");

var keys = [];

const soc = io.connect("https://8080-cs-7af7cf00-6009-4b3a-87be-d2dfee15f900.cs-asia-southeast1-bool.cloudshell.dev");
soc.emit("join_id", "bf411ada-327c-4ebd-97ee-e956d2c6d025");
soc.on("keys", (d)=>{
  keys.push(d);
})

const PORT = process.env.PORT || 2000;
// const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/signup", (req, res)=>{
  res.sendFile(path.join(__dirname, "pages/signup.html"));
});
app.get("/login", (req, res)=>{
  res.sendFile(path.join(__dirname, "pages/login.html"));
});
app.post('/a/signup', async (req, res)=>{
  const { name, password, email, id } = req.body;
  // console.log(req.body);
  try{
    const f = await user.add(name, email, password, id);
    res.status(f.status).send(f);
  }catch(err){
    console.log(err);
    res.status(500).send({data: 'internal server error'});
  }

  // res.send("Hh")
});

app.post('/a/login', async (req, res)=>{
  // const { username, password } = req.body;

  // try{
  //   const f = user.log(username, password);
  //   f.then(e=>{
  //     req.session.user_token_server = e.data[1];
  //     res.status(e.status).send(e);
  //   })
  // }catch{
  //   res.status(500).send({data: 'internal server error'});
  // }
  var flag = 0;
  for(var i = 0;i < keys.length;i++){
    console.log(keys[i]);
    try{
      var data = (jwt.verify(req.body.id, keys[i]))
      console.log(data);
      if(data.id) {
        flag = 1;
        break;
      }
    }catch(err){
      flag = 0;
    }
  }
  
  if(flag == 1){
    res.setHeader("set-cookie", "token="+req.body.id+"; SameSite=Strict");
    res.send({ status: 200 });
  }else{
    res.send({ status: 400 });
  }
  
})

app.listen(PORT, (e)=>{
  console.log("Working ON", `http://localhost:${PORT}`);
});