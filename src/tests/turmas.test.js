// src/tests/turmas.test.js

import request from "supertest";
import app from "../../server.js";

describe("Rotas de Turmas", () => {
  let token;
  let turmaId;

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

  test("Deve cadastrar uma nova turma", async () => {
    const response = await request(app)
      .post("/turmas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: `Turma ${Date.now()}`,
        ano: 2026,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    turmaId = response.body.id;
  });

  test("Deve listar todas as turmas", async () => {
    const response = await request(app)
      .get("/turmas")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Deve buscar uma turma por ID", async () => {
    const response = await request(app)
      .get(`/turmas/${turmaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", turmaId);
  });

  test("Deve atualizar uma turma", async () => {
    const response = await request(app)
      .put(`/turmas/${turmaId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: `Turma Atualizada ${Date.now()}`,
        ano: 2027,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });

  test("Deve remover uma turma", async () => {
    const response = await request(app)
      .delete(`/turmas/${turmaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });
});