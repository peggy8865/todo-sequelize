const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const UserId = req.user.id // UserId is case sensitive here.
  const name = req.body.name
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, userId } })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, userId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  let { name, isDone } = req.body
  isDone = isDone === 'on'
  return Todo.update({ name, isDone }, { where: { id, userId } })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.destroy({ where: { id, userId } })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router