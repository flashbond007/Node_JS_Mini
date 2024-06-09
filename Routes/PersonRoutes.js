const express= require('express');

const router=express.Router();

const Person=require('./../models/Person');    
//Get endpoint for details of the person
router.get('/detail', async (req,response)=>{

    try{

        const data=await Person.find();
        console.log('data is fetched!');
        response.status(200).json(data);  //send data from above in response very necessary,then only we get reponse details

    }
    catch(error){
        console.log(error);
        response.status(500).json({error: 'Internal Server Error! '});
        
    }
})

//Get endpoint according to the data of the worktype

router.get('/detail/:workType', async (req,res) => {
    try {
        const workType=req.params.workType; // defining name for the parameter taken
        if(workType=="chef" || workType=="manager" || workType=="waiter")
        {
            const response= await Person.find({work:workType}); //to find details of person according to worktype(mentioned above 3)
            console.log('response for particular workType is fetched!')
            res.status(200).json(response);
        }
        else{
            console.log('Bad parameter passed!');
            res.status(404).json({error:'Invalid Work Type!'})
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({error: 'Internal Server Error! '});
        
    }

})

//POST Endpoint for adding details in Persons
router.post('/person', async (req,res)=> {

    try {
        const data=req.body; //Taking data from request body(assuming body has the data in it)

        //Creating a newperson (oibject for Person model(Person table))
        const newPerson= new Person(data); 

        //Saving the data
        const response=await newPerson.save();
        console.log('data is saved!');
        res.status(200).json(response);

    } catch (error) {

        console.log(error);
        res.status(500).json({error: 'Internal Server Error! '});
        
    }

})

//PUT ENdpoint to update the person details

router.put('/detail/:id', async (req,res) => {
    try {
        const getid= req.params.id; //get and store id in getid

        const getdata=req.body; //get updated data from request body

        const updatedperson=await Person.findByIdAndUpdate(getid,getdata,{
            new: true, // save the new updated data
            runValidators: true // automatically run the validators in new updated data
        })
        
        if(!getdata) //if id is not correct and nothing comes in getdata feild
        {
            console.log('ID NOT FOUND');
            res.status(404).json({error:'ID NOT FOUND IN DB!'});
        }
        console.log('data is updated! with id- ', getid);
        res.status(200).json(updatedperson);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error!'})
        
    }
})

// DELETE Endpoint to delete User with ID

router.delete('/detail/:id', async (req,res) => {
    try {
            const getid=req.params.id; //getting id from request
            const data= await Person.findByIdAndDelete(getid);

            if(!data)
            {
                res.status(404).json({error:'ID NOT FOUND IN DB!'});
            }
            console.log('data deleted with id- ', getid);
            res.status(200).json({message:'person deleted! '});

    } catch (error) {
        
        console.log(error);
        res.status(500).json({error:'Internal Server Error!'})
        
    }
})

module.exports=router;