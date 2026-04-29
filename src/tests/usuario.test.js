// src/tests/usuario.test.js

import request from "supertest";
import app from "../../server.js";

describe("Rotas de Usuários", () => {
  let token;
  let usuarioId;

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

  test("Deve cadastrar um novo usuário", async () => {
    const response = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Usuário Teste",
        email: `usuario${Date.now()}@email.com`,
        senha: "123456",
        tipo: "admin",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    usuarioId = response.body.id;
  });

  test("Deve listar todos os usuários", async () => {
    const response = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Deve buscar um usuário por ID", async () => {
    const response = await request(app)
      .get(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", usuarioId);
  });

  test("Deve atualizar um usuário", async () => {
    const response = await request(app)
      .put(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Usuário Atualizado",
        email: `atualizado${Date.now()}@email.com`,
        tipo: "professor",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });

  test("Deve remover um usuário", async () => {
    const response = await request(app)
      .delete(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });
});