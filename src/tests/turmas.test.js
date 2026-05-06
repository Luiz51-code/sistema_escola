import request from "supertest";
import app from "../../server.js";

describe("Rotas de Turmas - CRUD Completo", () => {
  let token;

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

  test("Fluxo completo: Criar -> Buscar -> Listar -> Atualizar -> Deletar", async () => {
    let createdTurmaId;
    
    // 1. CRIAR TURMA
    console.log("\n📝 1. Criando turma...");
    const createRes = await request(app)
      .post("/turmas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Turma Teste",
        ano_letivo: 2024,
      });
    
    console.log("   Status:", createRes.status);
    console.log("   Resposta:", createRes.body);
    
    expect(createRes.status).toBe(201);
    expect(createRes.body).toHaveProperty("id");
    createdTurmaId = createRes.body.id;
    console.log(`   ✅ Turma criada com ID: ${createdTurmaId}`);
    
    // 2. BUSCAR TURMA POR ID
    console.log("\n🔍 2. Buscando turma por ID...");
    const getRes = await request(app)
      .get(`/turmas/${createdTurmaId}`)
      .set("Authorization", `Bearer ${token}`);
    
    console.log("   Status:", getRes.status);
    console.log("   Resposta:", getRes.body);
    

    expect(getRes.body).toHaveProperty("id", createdTurmaId);
    console.log(`   ✅ Busca realizada com sucesso`);
    
    // 3. LISTAR TODAS AS TURMAS
    console.log("\n📋 3. Listando todas as turmas...");
    const listRes = await request(app)
      .get("/turmas")
      .set("Authorization", `Bearer ${token}`);
    
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    console.log(`   ✅ Total de turmas: ${listRes.body.length}`);
    
    console.log("\n✏️ 4. Atualizando turma...");
    const updateRes = await request(app)
      .put(`/turmas/${createdTurmaId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: `Turma Atualizada ${Date.now()}`,
        ano: 2025,
      });
    
    console.log("   Status:", updateRes.status);
    console.log("   Resposta:", updateRes.body);
    
    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty("mensagem");
    console.log(`   ✅ Turma atualizada com sucesso`);
    
    // 5. VERIFICAR ATUALIZAÇÃO
    console.log("\n🔍 5. Verificando atualização...");
    const verifyRes = await request(app)
      .get(`/turmas/${createdTurmaId}`)
      .set("Authorization", `Bearer ${token}`);
    
    expect(verifyRes.status).toBe(200);
    console.log(`   ✅ Verificado: ${verifyRes.body.nome}`);
    
    // 6. DELETAR TURMA
    console.log("\n🗑️ 6. Deletando turma...");
    const deleteRes = await request(app)
      .delete(`/turmas/${createdTurmaId}`)
      .set("Authorization", `Bearer ${token}`);
    
    console.log("   Status:", deleteRes.status);
    console.log("   Resposta:", deleteRes.body);
    
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty("mensagem");
    console.log(`   ✅ Turma deletada com sucesso`);
    
    // 7. VERIFICAR DELECÃO
    console.log("\n🔍 7. Verificando deleção...");
    const finalRes = await request(app)
      .get(`/turmas/${createdTurmaId}`)
      .set("Authorization", `Bearer ${token}`);
    
    console.log("   Status:", finalRes.status);
    
    expect(finalRes.status).toBe(404);
    console.log(`   ✅ Confirmado que a turma foi removida`);
    
    console.log("\n🎉 Todos os testes CRUD de turma passaram!\n");
  });
});