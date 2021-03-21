const {Schema,model} = require('mongoose')

const UsuarioSchema = Schema({
    // esto es equivalante a crear una tabla con sus campos
    nombre:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require: true
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        require: true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default: false
    },
})

// sacar guion bajo en id y devolver solo id
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Usuario', UsuarioSchema)