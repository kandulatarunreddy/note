const express=require('express');
const Note=require('../models/note');
const User=require('../models/user');
const router=express.Router();

router.post('/',async (req,res)=>{
    try{
        const notes = await Note.getNote(req.body);
        console.log(notes);
        res.send(notes);
    }catch(err){
        res.status(401).send({message: err.message});
    }
})

.put('/edit', async (req, res) => {
    try {
      let note = await Note.editNote(req.body);
      res.send({...note});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      Note.deleteNote(req.body);
      res.send({success: "We'll Miss You... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .post('/create', async(req,res)=>{
    try {
      let note = await Note.createNote(req.body);
      res.send({...note})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

module.exports=router;