const {Schema,model} = require('mongoose')

const MedicoSchema = Schema({
    // esto es equivalante a crear una tabla con sus campos
    nombre:{
        type:String,
        require: true
    },
    img:{
        type:String,
    },
    usuario:{
        required:true,
        type: Schema.Types.ObjectId, // hay una relacion entre este schema con otro schema
        ref: 'Usuario'
    },
    hospital:{
        required:true,
        type: Schema.Types.ObjectId, // hay una relacion entre este schema con otro schema
        ref: 'Hospital'
    }
})

// sacar guion bajo en id y devolver solo id
MedicoSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Medico', MedicoSchema)