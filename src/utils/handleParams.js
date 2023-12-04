import {
    addPizza,
    deletePizzaById,
    getPizzaById,
    getPizzas,
  } from "../controller/controller.js";
  import { randomUUID } from "node:crypto";
  
  const processParams = async (req) => {
    //  ["getPizzas"]
    //  ["getPizza", "id", "1"]
    console.log(req, "<-- parametros mostrados desde el controlador");
    const action = req[0];
  
    switch (action) {
      case "getPizzas":
        return await getPizzas();
      case "getPizzaById":
        return await getPizzaById(Number(req[1]));
      case "addPizza":
        const ingredientes = req[1].split("-");
        const newPizza = {
          id: randomUUID(),
          ingredientes: ingredientes,
          nombre: req[2],
          precio: Number(req[3]),
          tamaño: req[4],
        };
        return await addPizza(newPizza);
      case "deletePizzaById":
        return await deletePizzaById(Number(req[1]));
      default:
        return "Petición incorrecta";
    }
  };

  export { processParams};