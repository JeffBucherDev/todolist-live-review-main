const deleteBtn = document.querySelectorAll('.del') // targets all elements in the document with the del class (returns a node list NOT an array)
const todoItem = document.querySelectorAll('.todoItem span') // targets all elements in the document with the '.todoItem span' class
const todoComplete = document.querySelectorAll('.todoItem span.completed') // targets all elements in the document with the '.todoItem span.completed' class

Array.from(deleteBtn).forEach((el)=>{ // takes everything from inside deleteBtn (nodelist) and turns it into an array
    el.addEventListener('click', deleteTodo) // adds eventlistener that listens for a click then executes deleteTodo when heard
})

Array.from(todoItem).forEach((el)=>{ // takes everything from inside todoItem (nodelist) and turns it into an array
    el.addEventListener('click', markComplete) // adds eventlistener that listens for a click then executes markComplete when heard
})

Array.from(todoComplete).forEach((el)=>{ // takes everything from inside todoComplete (nodelist) and turns it into an array
    el.addEventListener('click', undo) // adds eventlistener that listens for a click then executes undo when heard
})

async function deleteTodo(){ // asynchronous function called deleteTodo
    const todoText = this.parentNode.childNodes[1].innerText // creates variable todoText that selects the first child node in the ejs of the clicked todo
    try{ // marks a block of statements to try and specifies a response if an error is thrown
        const response = await fetch('deleteTodo', { // waits for the promise to resolve then goes to deleteTodo url, with data
            method: 'delete', // type of method being requested is a (delete)
            headers: {'Content-type': 'application/json'}, // type of content is json                    LINES 20(from wait on)-27 = REQUEST
            body: JSON.stringify({ // turns body object into a json string
                'rainbowUnicorn': todoText // request data in a key value pair
            })
        })
        const data = await response.json() // creates a variable that holds the response in json
        console.log(data) // logs the data that is responded
        location.reload() // reloads the webpage
    }catch(err){ // catches any error in the above code block
        console.log(err) // console logs the error
    }
}

async function markComplete(){ // asynchronous function called markComplete
    const todoText = this.parentNode.childNodes[1].innerText // creates variable todoText that selects the first child node in the ejs of the clicked todo
    try{ // marks a block of statements to try and specifies a response if an error is thrown
        const response = await fetch('markComplete', { // creates a variable that waits for the promise to resolve then goes to markComplete url, with data
            method: 'put', // method is set to a put request
            headers: {'Content-type': 'application/json'}, // sets type of content to json
            body: JSON.stringify({ // turns body json object into a json string
                'rainbowUnicorn': todoText // request data in a key value pair
            })
        })
        const data = await response.json() // creates a variable that holds the response in json
        console.log(data) // console logs the data that is responded
        location.reload() // reloads the webpage
    }catch(err){ // catches any error in the above code block
        console.log(err) // console logs the  error
    }
}

async function undo(){ // asynchronous function called undo
    const todoText = this.parentNode.childNodes[1].innerText // creates variable todoText that selects the first child node in the ejs of the clicked todo
    try{ // marks a block of statements to try and specifies a response if an error is thrown
        const response = await fetch('undo', { //creates a variable that waits for the promise to resolve then goes to the undo url, with data
            method: 'put', // sets method to a put request
            headers: {'Content-type': 'application/json'}, // sets the type of content to json
            body: JSON.stringify({ // turns body json object into a json string
                'rainbowUnicorn': todoText // request data in a key value pair
            })
        })
        const data = await response.json() // creates a variable that holds the response in json
        console.log(data) // console.logs the data that is responded
        location.reload() // reloads the webpage
    }catch(err){ // catches any error in the above code block
        console.log(err) // console logs the  error
    }
}