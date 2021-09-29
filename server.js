const express = require('express') // requires express module
const app = express() // sets app variable to express
const MongoClient = require('mongodb').MongoClient // requires mongodb module
const PORT = 2121 // sets port to localhost:2121
require('dotenv').config() // requires dot env module for db string

let db, // declares db variable
    dbConnectionStr = process.env.DB_STRING, // puts our db connection string from our env file to dbConnectionStr
    dbName = 'todo' // names our db 'todo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true}) // used our connection string to connect to the database
    .then(client => { // returns client (data) in form of promise
        console.log(`Hey, connected to ${dbName} database`) // logs the connection to our todo db
        db = client.db(dbName) // assigns our db variable as the db name (todos)
    })
    .catch(err =>{ // set up to catch any errors
        console.log(err) // console logs any errors
    })

app.set('view engine', 'ejs') // sets our EJS file as the display for our html
app.use(express.static('public')) // makes everything in our public folder accessible for client side
app.use(express.urlencoded({ extended: true })) // allows incoming request objects of strings and arrays (post/put requests)
app.use(express.json()) // allows incoming request objects as JSON objects (post/put requests)

app.get('/', async (req,res)=>{ // creates a get request as an async function
    const todoItems = await db.collection('todos').find().toArray() // creates a variable that stores all the objects from the db in an array
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) // creates a variable that counts how many database entries are left that are incomplete
    res.render('index.ejs', {zebra: todoItems, left: itemsLeft}) // inserts both variables into the ejs
})

app.post('/createTodo', (req, res)=>{ // creates a post request to create new todo tasks
    db.collection('todos').insertOne({todo: req.body.todoItem, completed: false}) // creates a new db entry that is incomplete
    .then(result =>{ // after request is completed
        console.log('Todo has been added!') // console logs message
        res.redirect('/') // refreshes page with new get request
    })
})

app.put('/markComplete', (req, res)=>{ // creates a put request (update)
    db.collection('todos').updateOne({todo: req.body.rainbowUnicorn},{ // goes into db and finds file with specific name and updates it
        $set: { // changes following key/value
            completed: true // sets completed to true
        }
    })
    .then(result =>{ // after updating executes 
        console.log('Marked Complete') // console logs message 'complete'
        res.json('Marked Complete') // response message 'marked complete'
    })
})

app.put('/undo', (req, res)=>{ // creates a put request
    db.collection('todos').updateOne({todo: req.body.rainbowUnicorn},{ // goes into db and finds file with specific name and updates it
        $set: { // changes following key/value
            completed: false // sets completed to false
        }
    })
    .then(result =>{ // after updating executes
        console.log('Marked Complete') // console logs message 'complete'
        res.json('Marked Complete') // responds in json 'marked complete'
    })
})

app.delete('/deleteTodo', (req, res)=>{ // creates a delete request
    db.collection('todos').deleteOne({todo:req.body.rainbowUnicorn}) // goes into db and deletes file with specific name
    .then(result =>{ // after deleting executes
        console.log('Deleted Todo') // console logs message
        res.json('Deleted It') // responds in json with message to the client
    })
    .catch( err => console.log(err)) // if there is an error logs error
})
 
app.listen(process.env.PORT || PORT, ()=>{ // uses express to listen to port specified in the process env (heroku) OR uses port variable declared (2121)
    console.log('Server is running, you better catch it!') // console logs message to let us know listen is working
})    