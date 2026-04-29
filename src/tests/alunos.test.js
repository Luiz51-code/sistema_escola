// src/tests/alunos.test.js

import request from "supertest";
import app from "../../server.js";

describe("Rotas de Alunos", () => {
  let token;
  let alunoId;

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

  test("Deve cadastrar um novo aluno", async () => {
    const response = await request(app)
      .post("/alunos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Aluno Teste",
        email: `aluno${Date.now()}@email.com`,
        senha: "123456",
        matricula: `MAT${Date.now()}`,
        turma_id: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    alunoId = response.body.id;
  });

  test("Deve listar todos os alunos", async () => {
    const response = await request(app)
      .get("/alunos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Deve buscar um aluno por ID", async () => {
    const response = await request(app)
      .get(`/alunos/${alunoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", alunoId);
  });

  test("Deve atualizar um aluno", async () => {
    const response = await request(app)
      .put(`/alunos/${alunoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Aluno Atualizado",
        email: `atualizado${Date.now()}@email.com`,
        matricula: `MAT${Date.now()}`,
        turma_id: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });

  test("Deve remover um aluno", async () => {
    const response = await request(app)
      .delete(`/alunos/${alunoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
  });
});