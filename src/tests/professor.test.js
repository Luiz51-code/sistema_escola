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
    
    console.log("✅ Login realizado com sucesso");
  });

  // Teste 1: Cadastrar
  test("Deve cadastrar um novo professor", async () => {
    const response = await request(app)
      .post("/professores")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Professor Teste",
        email: `professor${Date.now()}@email.com`,
        telefone: "(11) 99999-9999",
        especialidade: "Matemática",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    
    professorId = response.body.id;
    console.log(`✅ Professor criado com ID: ${professorId}`);
  });

  // Teste 2: Buscar por ID (depende do Teste 1)
  test("Deve buscar um professor por ID", async () => {
    // Aguarda o teste anterior terminar
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log(`🔍 Buscando professor ID: ${professorId}`);
    expect(professorId).toBeDefined();
    
    const response = await request(app)
      .get(`/professores/${professorId}`)
      .set("Authorization", `Bearer ${token}`);

    console.log(`📥 Status da busca: ${response.status}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", professorId);
  });

  // Teste 3: Listar todos
  test("Deve listar todos os professores", async () => {
    const response = await request(app)
      .get("/professores")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    console.log(`📋 Total de professores: ${response.body.length}`);
  });

  // Teste 4: Atualizar (depende do Teste 1)
  test("Deve atualizar um professor", async () => {
    expect(professorId).toBeDefined();
    
    const response = await request(app)
      .put(`/professores/${professorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Professor Atualizado",
        email: `atualizado${Date.now()}@email.com`,
        telefone: "(11) 88888-8888",
        especialidade: "Física",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
    console.log(`✏️ Professor ${professorId} atualizado`);
  });

  // Teste 5: Remover (depende do Teste 1)
  test("Deve remover um professor", async () => {
    expect(professorId).toBeDefined();
    
    const response = await request(app)
      .delete(`/professores/${professorId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("mensagem");
    console.log(`🗑️ Professor ${professorId} removido`);
  });
});