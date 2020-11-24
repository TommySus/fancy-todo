const { Todo,User } = require('../models')
const { compare } = require('../helper/bcrypt')

class Controller {

    static createTodo(req,res) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Todo.create(obj)
        .then( data => {
            res.status(201).json({
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            })
        })
        .catch(error => {
            const err = []
            for (let i = 0 ; i < error.errors.length; i++){
                err.push(error.errors[i].message)
            }
            console.log(err)
            res.status(500).json({message: err})
        })
    }

    static listTodo(req,res){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static findTodoById(req,res){
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if (data){
                res.status(200).json({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    due_date: data.due_date
                })
            } else {
                res.status(404).json({message: "id not found!"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static updateTodo(req,res){
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        },{where: {id: req.params.id}})
        .then(data => {
            res.status(200).json({
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            })
        })
        .catch(error => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static updateStatusTodo(req,res){
        Todo.update({
            status: req.body.status,
        },{where: {id: req.params.id}})
        .then(data => {
            if (data){
                res.status(200).json({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    due_date: data.due_date
                })
            }else {
                res.status(404).json({message: "id not found!"})
            }
        })
        .catch(error => {
            res.status(500).json({message: 'internal server error'})
        })
    }

    static deleteTodo(req,res){
        Todo.destroy({where: {id: req.params.id}})
        .then( data => {
            if (data){
                res.status(200).json({message: 'todo success to delete'})
            } else {
                res.status(404).json({message: 'id not found!'})
            }
        })
        .catch( error => {
            console.log(req.params)
            res.status(500).json({message: 'internal server error'})
        })
    }
}

module.exports = Controller