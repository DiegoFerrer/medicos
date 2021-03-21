require('dotenv').config() // leyendo las variables de entorno

const express = require('express')
const {dbConnection} = require('./database/config')

// Configurar CORS
const cors = require('cors')

// Crear servidor REST
const app = express()

app.use(cors())

// Lectura y parseo del body | va antes de las rutas
app.use( express.json() )


// base de datos
dbConnection()

// Directorio Publico
app.use(express.static(__dirname + '/public'))


// Rutas
app.use('/api/login',require('./routes/auth'))
app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/hospitales',require('./routes/hospitales'))
app.use('/api/medicos',require('./routes/medicos'))
app.use('/api/todo',require('./routes/busquedas'))
app.use('/api/upload',require('./routes/upload.routing'))

// levantar servidor
app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
})
