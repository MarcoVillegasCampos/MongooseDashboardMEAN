const { render } = require('ejs');
const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rabit-db', { useNewUrlParser: true });
const { RabbitModel } = require("./models/rabbitModel");
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get ('/', function (request,response){
    RabbitModel
    .findAllRabbits({})
    .then( results => {
        console.log(results);
        response.render('index', {rabbits:results});
    })

})

app.get('/rabbit/new', function (request, response) {
    response.render('form');
});

app.post('/rabbit', function (request, response) {
    const name = request.body.name;
    const color = request.body.color;

    const newRabbit = {
        name,
        color,
    }
    RabbitModel
        .createRabbit(newRabbit)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log("Something went wrong")
        })

    response.redirect("/");

})

app.get('/rabbit/edit/:id', function (request, response) {
    RabbitModel
        .getRabbitById({ _id: request.params.id })
        .then(result => {
            response.render('edit', { rabbit: result });
        })
});

app.post('/rabbit/:id', function (request, response) {
    const name = request.body.name;
    const color = request.body.color;
    newRabbit = {
     
        name,
        color,

    }
    RabbitModel
 
 
    .updateRabbit(newRabbit)
    .then(result => {
        console.log(result);
        response.render('showRabbit', { rabbit: newRabbit });
    })
    .catch(err => {
        console.log("Something went wrong")
    })

    
});

app.get('/rabbit/:id', function(request,response){
    RabbitModel
    .getRabbitById({_id:request.params.id})
    .then( result =>{
        response.render('showRabbit', {rabbit:result})
    })
})

app.post('/rabbits/destroy/:id', function(request,response){

    RabbitModel
    .getRabbitById({_id:request.params.id})
    .then( result =>{
        result.remove();
        response.redirect('/');

    })

})






app.listen(8080, function () {
    console.log("The users server is running in port 8181.");
});