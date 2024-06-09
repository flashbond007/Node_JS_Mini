const express=require('express');

const router=express.Router();

const Menuitem=require('./../models/Menuitem');

// GET ITEM FOR MENU AVAILABLE
router.get('/getmenu', async (req,res) => {
    try {
            const menudata= await Menuitem.find();
            console.log('These are the menu items available!')
            res.status(200).json(menudata);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error! '});
        
    }
})


//POST ITEM FOR ADDING MENU
router.post('/addmenu', async (req,res) => {
    try {
        
        const menudata=req.body //taking data from the body

        const newmenu= new Menuitem(menudata); //making new menuitem

        const menuresponse= await newmenu.save(); //saving the new menuitem
        console.log('MenuItem is saved!');
        res.status(200).json(menuresponse);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error! '});
        
    }

})

//GET ITEM FOR ADDING MENU with taste type
router.get('/getmenu/:taste', async (req,res) => {
    try {
        const tastetype=req.params.taste; // getting paramter value storinf it in tastetype

        if(tastetype=='sweet' || tastetype=='sour' || tastetype=='spicy')
        {
            const data= await Menuitem.find({taste:tastetype});
            console.log('Food item with particular taste found!');
            res.status(200).json(data);
        }
        else{
            console.log('Bad paramater found!');
            res.status(404).json({error:'Taste not found!'})

        }
        
    } catch (error) {

        console.log(error);
        res.status(500).json({error:'Internal Server Error!'});
        
    }
})

//PUT ENdpoint for updating menu

router.put('/getmenu/:id',async (req,res) => {

    try{
    const getid=req.params.id; //getting and storing id in getid

    const getdata=req.body; //getting data from the body

    const updatemenu=await Menuitem.findByIdAndUpdate(getid,getdata,{
        new:true,
        runValidators:true
    })

    if(!getdata)
    {
        res.status(404).json({error:'ID NOT FOUND!'});
    }
    console.log('Menu Data updated with ID- ',getid);
    res.status(200).json({message:'Menu Data updated'});
}
catch(error){
    console.log(error);
    res.status(500).json({error:'Internal Server Error!'})
        
}
})

//DELETE ENDPOINT FOR MENU ITEM

router.delete('/getmenu/:id', async(req,res) => {
    try {
        const getid=req.params.id;
        const deletedata= await Menuitem.findByIdAndDelete(getid);

        if(!getid)
        {
            res.status(404).json({error:'ID NOT FOUND!'});
        }

        console.log("Menu data deleted with id: ",getid);
        res.status(200).json({message:'Menu data deleted successfully'})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error!'})
            
    }
})

module.exports=router;