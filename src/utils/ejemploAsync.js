// import {MongoClient} from "mongodb";
// import dotenv from "dotenv";
// dotenv.config();

// const uriDb = process.env.URI_DB;

// const clientMongo = new MongoClient(uriDb);

// const createConnectionMongo = async () => {
//    await clientMongo.connect();
//    console.log("Connection to the database established.");
// };

// await createConnectionMongo();


// La palabra clave async se utiliza para declarar que la función createConnectionMongo es asíncrona. Cuando una función está marcada como async, significa que esa función devuelve una promesa implicitamente, y dentro de la función puedes utilizar la palabra clave await para esperar a que una operación asíncrona (como una promesa) se complete.

// En este caso, await clientMongo.connect(); se utiliza para esperar a que la conexión a la base de datos se complete antes de continuar con la ejecución del código siguiente. Sin await, la función podría continuar ejecutándose antes de que la conexión se haya establecido completamente, lo que podría llevar a errores.

// Para manejar errores en funciones asíncronas, puedes usar bloques try...catch. Aquí hay un ejemplo de cómo podrías manejar errores en tu función:

// const createConnectionMongo2 = async () => {
//   try {
//     await clientMongo.connect();
//     console.log("Connection to the database established.");
//   } catch (error) {
//     const msjError = `${error.code} - ${error.codeName}`;
//     console.log("Authentication failed " + msjError);
//   }
// };

// await createConnectionMongo2();

// -------------------------------------------------------------------------------------------

// Sincronica
const waitDelay = () => {
  setTimeout(() => {
    console.log("hola desde un archivo asíncrono");
  }, 2000);
};

// waitDelay();

// Asincrónica

const waitDelay2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = Math.random() < 0.5;
      if (randomNum === true) {
        resolve("Se resolvió exitosamente :D");
      } else {
        reject("Se resolvio de forma no éxitosa :(");
      }
    }, 2000);
  });
};

const responsePromise = async () => {
  try {
    const resolve = await waitDelay2();
    console.log(resolve);
  } catch (err) {
    console.log("ERROR EN LA VALIDACIÓN " + err);
  }
};