// Importar la instancia 'client' desde el módulo mongo.js en la carpeta database.
import { client } from "../database/mongodb.js";

// Función para obtener la colección de pizzas desde la base de datos.
const getPizzasCollection = async () => {
  try {
    // Obtener la referencia a la base de datos desde la instancia 'client'.
    const database = client.db();
    // Obtener la colección llamada "pizzas".
    const collection = database.collection("pizzas");
    // Devolver la colección.
    return collection;
  } catch (error) {
    // Manejar errores al conectar a la base de datos.
    console.error("Error al conectar a la base de datos:", error);
    // Lanzar el error para que sea manejado por el llamador de la función.
    throw error;
  }
};

// Función para obtener todas las pizzas en la colección.
const getPizzas = async () => {
  try {
    // Obtener la colección de pizzas.
    const collection = await getPizzasCollection();
    // Obtener todas las pizzas y convertirlas en un array.
    const pizzas = await collection.find().toArray();
    // Devolver el array de pizzas.
    return pizzas;
  } catch (error) {
    console.error("Error al obtener las pizzas:", error);
    throw error;
  }
};

// Función para obtener una pizza por su ID.
const getPizzaById = async (id) => {
  try {
    // Obtener la colección de pizzas.
    const collection = await getPizzasCollection();
    // Buscar y devolver la pizza con el ID proporcionado.
    const pizza = await collection.findOne({ id: id });
    return pizza;
  } catch (error) {
    console.error("Error al obtener la pizza por ID:", error);
    throw error;
  }
};

// Función para agregar una nueva pizza a la colección.
const addPizza = async (nuevaPizza) => {
  try {
    // Obtener la colección de pizzas.
    const collection = await getPizzasCollection();
    // Verificar si ya existe una pizza con el mismo nombre.
    const existingPizza = await collection.findOne({
      nombre: nuevaPizza.nombre,
    });
    if (existingPizza) {
      // Devolver un mensaje indicando que la pizza ya existe.
      return "Ya existe la pizza :(";
    }
    // Insertar la nueva pizza en la colección.
    await collection.insertOne(nuevaPizza);
    // Devolver un mensaje indicando que la pizza fue agregada con éxito.
    return "Pizza agregada con éxito :)";
  } catch (error) {
    console.error("Error al agregar la pizza:", error);
    throw error;
  }
};

// Función para eliminar una pizza por su ID.
const deletePizzaById = async (id) => {
  try {
    // Obtener la colección de pizzas.
    const collection = await getPizzasCollection();
    // Buscar la pizza por su ID.
    const pizza = await collection.findOne({ id: id });
    if (pizza) {
      // Si la pizza existe, eliminarla de la colección.
      await collection.deleteOne({ id: id });
      // Devolver un mensaje indicando que la pizza fue borrada con éxito.
      return "Pizza borrada con éxito o.o";
    }
    // Si la pizza no existe, devolver un mensaje indicando que no se encontró la pizza.
    return "La pizza no existe :O";
  } catch (error) {
    console.error("Error al borrar la pizza por ID:", error);
    throw error;
  }
};

// Exportar las funciones para que puedan ser utilizadas en otros módulos o archivos.
export { getPizzas, getPizzaById, addPizza, deletePizzaById };