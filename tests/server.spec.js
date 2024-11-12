const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    
  it("GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.toBe).toBe(true));
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("se obtiene un código 404 al intentar eliminar un café con un id que no existe.", async () => {
    const idError = 99;
    const token = "placeholder-token";
    const response = await request(server)
      .delete(`/cafes/${idError}`)
      .set("Authorization", token);
    expect(response.status).toBe(404);
  });

  it("POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
    const addCafe = { id: 5, nombre: "Latte" };
    const response = await request(server).post("/cafes").send(addCafe);
    expect(response.status).toBe(201);
  });

  it("PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un ID en parámetros diferente al ID dentro del payload", async () => {
    const coffeeId = 1; 
    const updatedCoffee = { id: 6, nombre: "Update" }; 
    const response = await request(server)
      .put(`/cafes/${coffeeId}`)
      .send(updatedCoffee);
    expect(response.status).toBe(400);
  });

});
