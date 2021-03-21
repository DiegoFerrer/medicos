const {Schema,model} = require('mongoose')

const HospitalSchema = Schema({
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
    }
})

// sacar guion bajo en id y devolver solo id
HospitalSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject()
    object.id = _id
    return object
},{collection:'hospitales'}) // para que sea hospitales y no hospitals,

module.exports = model('Hospital', HospitalSchema)