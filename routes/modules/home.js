const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', (req, res) => {
  const userId = req.user.id
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { userId }
  })
    .then(todos => res.render('index', { todos: todos }))
    .catch(err => res.status(422).json(err))
})

module.exports = router