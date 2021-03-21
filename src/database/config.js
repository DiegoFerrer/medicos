const mongoose = require("mongoose");


const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      // la cadena es la misma que se puso en compass
      useNewUrlPaser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Db Online');
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la DB");
  }
};


module.exports = {
    dbConnection
}
