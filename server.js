// console.log("hi hello howji");
// function add(a,b){
//     return a+b;
// }

// var add=function(a,b){
//     return(a+b);
// }

// var add=(a,b) => {return a+b};

// var add=(a,b) => a + b;
// var res= add(15,5);
// console.log(res);

// function callback(){
//     console.log("callback is initiated !!");
// }

// how to use callback function
// const add= function(a,b,callback)
// {
//     var res=a+b;
//     console.log('result-'+ res);
//     callback();
// }
// add(9,3, () => console.log("callback is initiated no matter that function name is there or not it picks !") );

//how to use librarier like fs and os---------

// var fs= require('fs');
// var os= require('os');

// var result= os.userInfo();
// console.log(result);
// console.log(result.username);

// fs.appendFile('greeting.txt','Hi babbar how r u!' + result.username + '\n',() => console.log("file is created dear!"));

// how to import files..........................................

// var notes=require('./notes.js');

// console.log("result is "+ notes.add(8,9));


// var _=require('lodash');

// const arr=['name','name',5,6,2,5,6,8,2];

// var result= _.uniq(arr);

// console.log(result);
// app.get('/ladoo', function (req, res) {
//     res.send('bheem khayega ladoo!!')
// })
// app.get('/idli', (req,res) => { res.send('raju khayega idlii wada!!')})
// app.post('/items',(re1,res)=> {res.send('data is saved!')})
const express = require('express');
const app = express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req body
const Person=require('./models/Person');
const Menuitem=require('./models/Menuitem');
require('dotenv').config();
app.get('/', function (req, res) {
    res.send('Welcome friends welcome home folks!!')
})

const personroutes=require('./Routes/PersonRoutes')

app.use('/',personroutes);

const menuroutes=require('./Routes/MenuRoutes')
app.use('/',menuroutes);

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{console.log('Server is live!')})
