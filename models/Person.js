const mongoose=require('mongoose');

//define person schema with all the feild details and there types

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum: ['chef', 'manager', 'waiter'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    Salary:{
        type:Number,
        required:true
    }
})

//define Person Model

const Person=mongoose.model('Person',personSchema);

//export Person model
module.exports=Person;