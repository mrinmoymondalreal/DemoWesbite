const conn = require('../conn/conn')
const user = require('../models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var isDef = (e)=> !(e == null  || e == undefined);

const JWT_TOKEN = "ssndksajjasanb397821631vj$#%@CHVGWQ5%@%";

async function addUser(name, email, plain_password, id){
    var f = await user.findOne({email: email});
    if(!(isDef(f))){
        const password = await bcrypt.hash(plain_password, 10);
        const added = await user.create({name, email, password, id});
        var token = jwt.sign({ user_id: added._id, email: added.email }, JWT_TOKEN);
        return {status:200, data: ['successfully added', token]};
    }else{
        return {status: 404, data: ['email already exist']};
    }
}

async function logUser(email, plain_password){
    // var f = await user.findOne({email: email});
    // if(isDef(f)){
    //     const password = await bcrypt.compare(plain_password, f.password);
    //     var token = jwt.sign({ user_id: f._id, email: f.eamil }, JWT_TOKEN);
    //     if(password) return {status:200, data: ['successfully added', token]};
    //     return {status: 404, data: ['password wrong']};
    // }else{
    //     return {status: 404, data: ['User not found']};
    // }
}

module.exports = {
    add: addUser,
    log: logUser
}