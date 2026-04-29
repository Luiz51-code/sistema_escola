// 


// src/tests/notas.test.js

import request from "supertest";
import app from "../../server.js";

describe("Rotas de Notas", () => {
  let token;
  let notaId;

  beforeAll(async () => {
    const response = await request(app).post("/auth/login").send({
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

  test("Deve cadastrar uma nova nota", async () => {
    const response = await request(app)
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: 7,
        disciplina_id: 1,
        nota: 9.0,
        bimestre: "2º Bimestre",
        observacao: "Continue assim!",
      });

    console.log("Cadastro:", response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    notaId = response.body.id;
  });

  test("Deve listar todas as notas", async () => {
    const response = await request(app)
      .get("/notas")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Deve buscar uma nota por ID", async () => {
    const response = await request(app)
      .get(`/notas/${notaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", notaId);
  });

  test("Deve atualizar uma nota", async () => {
    const response = await request(app)
      .put(`/notas/${notaId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: 7,
        disciplina_id: 1,
        nota: 10.0,
        bimestre: "2º Bimestre",
        observacao: "Nota atualizada",
      });

    expect(response.status).toBe(200);
    expect(response.body.mensagem).toBe(
      "Nota atualizada com sucesso"
    );
  });

  test("Deve remover uma nota", async () => {
    const response = await request(app)
      .delete(`/notas/${notaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.mensagem).toBe(
      "Nota removida com sucesso"
    );
  });
});