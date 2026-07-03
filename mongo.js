require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('persons', phonebookSchema)

if (name && number) {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
