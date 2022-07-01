const supertest = require('supertest');

const app = require('../src/app');

test('Deve inserir um estudante com sucesso', () => {
  return supertest(app).post('/students')
    .send({
      registration: '1804315',
      name: 'Jobson Tenório do Nascimento',
      email: 'jobson.nascimento@pesqueira.ifpe.edu.br',
      birth_date: '03/05/1981',
    }).then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.registration).toBe('1804315');
      expect(res.body.name).toBe('Jobson Tenório do Nascimento');
      expect(res.body.email).toBe('jobson.nascimento@pesqueira.ifpe.edu.br');
      expect(res.body.birth_date).toBe('03/05/1981');
    });
});

test('Deve inserir outro estudante com sucesso', () => {
  return supertest(app).post('/students')
    .send({
      registration: '1643697',
      name: 'Jailson Tenório do Nascimento',
      email: 'jailson.nascimento@pesqueira.ifpe.edu.br',
      birth_date: '16/10/1983',
    }).then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.registration).toBe('1643697');
      expect(res.body.name).toBe('Jailson Tenório do Nascimento');
      expect(res.body.email).toBe('jailson.nascimento@pesqueira.ifpe.edu.br');
      expect(res.body.birth_date).toBe('16/10/1983');
    });
});

test('Deve listar todos os estudantees', () => {
  return supertest(app).get('/students').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toEqual({
      registration: '1804315',
      name: 'Jobson Tenório do Nascimento',
      email: 'jobson.nascimento@pesqueira.ifpe.edu.br',
      birth_date: '03/05/1981',
      id: 1,
    });
    expect(res.body[1]).toEqual({
      registration: '1643697',
      name: 'Jailson Tenório do Nascimento',
      email: 'jailson.nascimento@pesqueira.ifpe.edu.br',
      birth_date: '16/10/1983',
      id: 2,
    });
  });
});

test('Deve listar um estudante', () => {
  return supertest(app).get('/students/2').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('1643697');
    expect(res.body.name).toBe('Jailson Tenório do Nascimento');
    expect(res.body.email).toBe('jailson.nascimento@pesqueira.ifpe.edu.br');
    expect(res.body.birth_date).toBe('16/10/1983');
  });
});

test('Deve apagar um estudante', () => {
  return supertest(app).delete('/students/1').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('1804315');
    expect(res.body.name).toBe('Jobson Tenório do Nascimento');
    expect(res.body.email).toBe('jobson.nascimento@pesqueira.ifpe.edu.br');
    expect(res.body.birth_date).toBe('03/05/1981');
  });
});

test('Deve alterar um estudante', () => {
  return supertest(app).put('/students/2')
    .send({
      registration: '1643697',
      name: 'Jailson Tenório do Nascimento',
      email: 'jailson.tenorio@belojardim.ifpe.edu.br',
      birth_date: '16/10/1983',
    }).then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        registration: '1643697',
        name: 'Jailson Tenório do Nascimento',
        email: 'jailson.tenorio@belojardim.ifpe.edu.br',
        birth_date: '16/10/1983',
        id: 2,
      });
    });
});

test('Deve listar o estudante com os dados alterados', () => {
  return supertest(app).get('/students/2').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('1643697');
    expect(res.body.name).toBe('Jailson Tenório do Nascimento');
    expect(res.body.email).toBe('jailson.tenorio@belojardim.ifpe.edu.br');
    expect(res.body.birth_date).toBe('16/10/1983');
  });
});

test('Deve apagar outro estudante', () => {
  return supertest(app).delete('/students/2').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('1643697');
    expect(res.body.name).toBe('Jailson Tenório do Nascimento');
    expect(res.body.email).toBe('jailson.tenorio@belojardim.ifpe.edu.br');
    expect(res.body.birth_date).toBe('16/10/1983');
  });
});
