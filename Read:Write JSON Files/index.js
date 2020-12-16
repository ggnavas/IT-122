// using the require function to grab the address of the customer

const cust_addr = require('./customer.json')

//console.log(cust_addr.address)

/* this is a synchronous or blocking function so no other 
code none of it would run until the file is read
also since it is cashed if the file update you would only
the same cached data from when the file was first read. */

// using fs.readFile()

const fs = require('fs');
const { stringify } = require('querystring');

/* fs.readFile('./customer.json', 'utf-8', (err, jsonString) =>{
    if (err){        
        console.log(err)
    } else {
        console.log(jsonString)
    }
}) */

// the readFile() function takes 3 arguments
// 1) the path of the file you want to read, 
// 2) the encoding for the file
// 3) a callback function that takes an error and data from the file

/* This result is a string not an object. Since we are using the utf-8 encoding our result outputs
    as a string. If we didn't use the utf-8 encoding the data would return as a buffer and you
    be able to read it with console.log */

// if we where to try and access the address from what we have so far we would get an error because
// this is a string not an object

/* fs.readFile('./customer.json', 'utf-8', (err, jsonString) =>{
    if (err){        
        console.log(err)
    } else {
        console.log(jsonString.address)
    }
}) */

// if we want to grab a property we first need to parse the data into a JS object
// to do this we use the JSON.parse() function

/* fs.readFile('./customer.json', 'utf-8', (err, jsonString) =>{
    if (err){        
        console.log(err)
    } else {
        const cust_data = JSON.parse(jsonString)
        console.log(cust_data.address)
    }
}); */

// Something to keep in mind is that JSON.parse is a synchronous function. So when 
// it encounters an error, that is not caught, will crash your application
// so to parse the data properly you should encase this code in a try/catch

/* fs.readFile('./customer.json', 'utf-8', (err, jsonString) =>{
    if (err) {        
        console.log(err)
    } else {
        try {
            const cust_data = JSON.parse(jsonString)
            console.log(cust_data.address)
        } catch (err) {
            console.log('Error parsing JSON', err)
        }
    }
}); */

// the try/catch will prevent any errors from parsing bad JSON.

// fs.readFile() this is the asynchronous way to read a file it takes a callback and
// doesn't block execution while running
// there is a synchronous way as well called fs.readFileSync()

/* try {
    const jsonString = fs.readFileSync('./customer.json', 'utf-8');
    const cust = JSON.parse(jsonString)
    console.log(cust.address)
} catch (err) {
    console.log(err)
} */

// The best way to read a file would be to use the asynchronous method
// Now we can build a helper function to read the file and parse the date

function readJSON(filePath, cb) {
 fs.readFile(filePath, 'utf-8', (err, fileData) => {
    if (err) {        
        return cb && cb(err)
    } 
    try {
        const obj = JSON.parse(fileData)
        return cb && cb(null, obj)
    } catch (err) {
        return cb && cb(err)
    }
 });
}

// with the helper function we can pass, the file path to the json file and a callback to handle
// the parsed json data

/* readJSON('./customer.json', (err, data) => {
    if (err){
        console.log(err)
    } else {
        console.log(data.address)
    }
}) */

// Writing data to a JSON file is similar to what we've just done. 
// the main difference is that you would need to stringify the data that you will be 
// writing to the file.

// Lets create and object to write to the file

const newObject = {
    name: 'Newbie Corp',
    order_count: 0,
    address: 'Po Box City'
}

// to stringify we use the stringify function

/* const jsonString = JSON.stringify(newObject)
console.log(jsonString) */

// to write the object to the json file you use the fs writeFile() function

/* fs.writeFile('./newCustomer.json', JSON.stringify(newObject), err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Written successfully')
    }
}) */

// write file take 3 parameters as well. 
// 1) the path to the file to be written to. If this file exists already it will be overwritten
// 2) the new data/object to be written 
// 3) a callback function to receive an error if one occurs

// this create a new file with the data written all in 1 line
// we can prettify this with some arguments available to the stringify method

/* fs.writeFile('./newCustomer.json', JSON.stringify(newObject, null, 2), err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Written successfully')
    }
})  */

// we pass null and 2 as the optional arguments to the stringify.
// the second argument, could be a replacement to change how stringify actually works
// the third argument, 2, represnts the amount of whitespace to add into the string for readability


// now using the helper function we created, we will use the readFile function to read the file
// make a change to the data and then use the writeFile function to back to the file
function readJSON(filePath, cb) {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
       if (err) {        
           return cb && cb(err)
       } 
       try {
           const obj = JSON.parse(fileData)
           return cb && cb(null, obj)
       } catch (err) {
           return cb && cb(err)
       }
    });
   }
   readJSON('./customer.json', (err, data) => {
    if (err){
        console.log(err)
    } else {
        data.order_count += 1
        fs.writeFile('./customer.json', JSON.stringify(data, null, 2), err => {
            if (err) {
                console.log(err)
            }
        })
    }
})