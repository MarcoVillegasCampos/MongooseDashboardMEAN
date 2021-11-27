const mongoose= require('mongoose');


const rabbitSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    color:{
        type:String,
        required:true,

    }
});

const Rabbit = mongoose.model('rabbit', rabbitSchema);

const RabbitModel={
    createRabbit: function(newRabbit){
        return Rabbit.create(newRabbit)
    },
    getRabbitById : function( _id ){
        return Rabbit.findOne({ _id });
    },

    
    updateRabbit: function (newRabbit){
        return Rabbit.updateOne(newRabbit)
    },

    findAllRabbits: function (){
        return Rabbit.find();
    },

    


}

module.exports={RabbitModel};