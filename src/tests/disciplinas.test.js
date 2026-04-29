// src/tests/disciplinas.test.js

import request from "supertest";
import app from "../../server.js";

describe("Rotas de Disciplinas", () => {
  let token;
  let disciplinaId;

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

  test("Deve cadastrar uma nova disciplina", async () => {
    const response = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: `Disciplina Teste ${Date.now()}`,
        carga_horaria: 80,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    disciplinaId = response.body.id;
  });

  test("Deve listar todas as disciplinas", async () => {
    const response = await request(app)
      .get("/disciplinas")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Deve buscar uma disciplina por ID", async () => {
    const response = await request(app)
      .get(`/disciplinas/${disciplinaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", disciplinaId);
  });

  test("Deve atualizar uma disciplina", async () => {
    const response = await request(app)
      .put(`/disciplinas/${disciplinaId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: `Disciplina Atualizada ${Date.now()}`,
        carga_horaria: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });

  test("Deve remover uma disciplina", async () => {
    const response = await request(app)
      .delete(`/disciplinas/${disciplinaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });
});