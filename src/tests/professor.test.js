// src/tests/professor.test.js

import request from "supertest";
import app from "../../server.js";

describe("Rotas de Professores", () => {
  let token;
  let professorId;

  beforeAll(async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "guga@email.com",
        senha: "3456",
      });

    token = response.body.token;

    if (!token) {
      throw new Error(
        `Falha no login: ${JSON.stringify(response.body)}`
      );
    }
  });

  test("Deve cadastrar um novo professor", async () => {
    const response = await request(app)
      .post("/professores")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Professor Teste",
        email: `professor${Date.now()}@email.com`,
        senha: "123456",
        especialidade: "Matemática",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    professorId = response.body.id;
  });

  test("Deve listar todos os professores", async () => {
    const response = await request(app)
      .get("/professores")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Deve buscar um professor por ID", async () => {
    const response = await request(app)
      .get(`/professores/${professorId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", professorId);
  });

  test("Deve atualizar um professor", async () => {
    const response = await request(app)
      .put(`/professores/${professorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Professor Atualizado",
        email: `atualizado${Date.now()}@email.com`,
        especialidade: "Física",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });

  test("Deve remover um professor", async () => {
    const response = await request(app)
      .delete(`/professores/${professorId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });
});