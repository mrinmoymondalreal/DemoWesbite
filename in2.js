var Datastore = require('nedb')
  , db = new Datastore({ filename: 'database.db', autoload: true });


const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var isDef = (e)=> !(e == null  || e == undefined);

// db.loadDatabase(function (err) {    

// });

async function insert(name, email, plain_password, id){
    return new Promise(res=>{
        db.findOne({email: email}, async (err, d)=>{
            if(err) res({status: 404, data: 'unexpected problem' });
            if(!(isDef(d))){
                const password = await bcrypt.hash(plain_password, 10);
                const added = db.insert({name, email, password, id}, (err, added)=>{
                    if(err) res({status: 404, data: 'unexpected problem' });
                    var token = jwt.sign({ user_id: added._id, email: added.email }, "JWT_TOKEN");
                    res({status:200, data: token});
                });
            }else{
                res({status: 404, data: 'email already exist' });
            }
        });
    });
}

async function log(doc){
    return new Promise(res=>{
        db.findOne({id: doc.id}, async (err, d)=>{
            if(isDef(d)) res({status: 200, data: d});
            res({status: 400});
        });
    });
}

module.exports = {
    add: insert,
    log
}
