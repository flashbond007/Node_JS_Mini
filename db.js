const mongoose=require('mongoose');

//set mongodb database connection with URL

const mongoURL= 'mongodb://localhost:27017/hotels'  //Replace hotel with any database name of your choice

//set up mongoose connect
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get default connection
//Mongoose maintains the default db connection with object
const db=mongoose.connection;

//Define event listeners
db.on('connected', ()=> {console.log("Mongodatabase Server is connected!");
});

db.on('error', (err)=> {console.log("Db is facing some error!: ",err);});

db.on('disconnected', ()=> {console.log("Mongodb Server is disconnected! ");} );

module.exports=db;

