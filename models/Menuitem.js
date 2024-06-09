const mongoose=require('mongoose');

//defeine schema
const menuItemSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        requried:true
    },
    taste:{
        type:String,
        requried:true,
        enum:['sweet','spicy','sour']    
    },
    is_drink:{
        type: Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})
const Menuitem=mongoose.model('Menuitem',menuItemSchema);
//export menuitems
module.exports=Menuitem;