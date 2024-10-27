const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/test')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err))

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req,res) => {
    const {id} = req.params;
    
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(err => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req,res) => {
    const task = req.body.task;

    if(!task) {
        return res.status(400).json({error: "Task is required"});
    }

    TodoModel.create({
        task: task
    })
    .then(result => {
        console.log("Task Created: ", result);
        res.json(result)
    })
    .catch(err => {
        console.error("Error creating task: ", err)
        res.status(500).json({error: "Failed to create task", details: err.message});
    })

})

app.put("/updateTask/:id", async(req, res) => {
    const {id} = req.params;
    const {task} = req.body;
    try {
        const updatedTask =  await TodoModel.findByIdAndUpdate(id, {task: task}, {new: true});
        res.json(updatedTask);
    }catch (err) {
        res.status(500).json(err);
    }
});
app.listen(3001, () => {
    console.log("Server is running")


})
