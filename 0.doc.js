/* 
1. npm init -y | crear el package.json
2. npm i express --save | instalar express
3. crear archivo index.js
      * node index.js
4. npm i nodemon -s-save-dev
      * nodemon index.js
      ? crear scripts
            "start:dev": "nodemon index.js"
            todo, npm run start
*/

/* 
?            MONGO ATLAS
Mongo Atlas, el cual es una base de datos Mongo en la nube, sumamente útil y flexible, nos ofrecen 500MB de forma gratuita, lo cual es bastante para bases de datos donde se almacena texto.
https://www.mongodb.com/cloud/atlas/efficiency

1. crearse una cuenta
2. builder a cluster free (opciones por defecto)
3. instalar en la maquina local, mongo compass
4. en mongo atlas seleccionar conectar y conectar con mongo compass
5. copiar url y pegar en mongo compass, borrar la parte final que se llama test, por el nombre de la base de datos que se quiere
6. en atlas ir a database access(izquierda) y crear new user
7. reeplazar user y password y pegar en la ruta
8. conectar
mongodb+srv://prueba2021:IUgd4M9HTpOZAcCH@cluster0.evn3t.mongodb.net/hospitalesdb?authSource=admin&replicaSet=atlas-5ykj9r-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
?9. establecer conexion, ver index.js
      * instalar moongose, npm i mongoose
todo, 10. Crear variables de entorno
      * instalar config, npm i dotenv 
            te permite leer archivos con la extension .env
            ? crear archivo .env en la raiz
11. CORS
      * npm i CORS
12. Encriptado y Tokens

13. variables de entorno
      * npm i dotenv
14. validaciones de campos
      * npm i express-validator
15. Encriptar la contraseña
      * npm i bcryptjs
16. Json web tokens
      * npm i jsonwebtoken
17. express-fileupload
      * npm i express-fileupload
18. uuid | para generar identificadores unicos
      * npm i uuid
////###################################################
? GOOGLE | 
1. https://developers.google.com/identity/sign-in/web/sign-in
2. https://console.cloud.google.com/projectselector2/apis/credentials?pli=1&supportedpurview=project

      * ir a la pagina de lñas credenciales y poner nuevo proyecto y crear
      * ver, en credenciales
      * crear credenciales
      * User Type: externos
      * nombre de la aplicacion
      * guardar
      * volver a credenciales y seleccionar crear aplicacion we (crear id de cliente)
      * agregar uri : localhost:3000
      * Crear
todo, te va a dar el cliente id y el secret id ,copiar. y pegarlos en los enviroments
      * seguir pasos de la pagina 1,scripts,meta,etc
      * ver en authenticate with server, en node, el npm install

*/