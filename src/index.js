const express = require('express');

const server = express();

// É necessário dizer para o express que ele vai usar JSON para que ele possa receber informações nesse formato
server.use(express.json());

//Usando route params

const users = ['Gustavo','João','Paulo'];

// Ler todos os usuarios
server.get('/users', (request,response) => {
  return response.json(users);
})

// Ler apenas um usuario
server.get('/users/:index', (request,response) => {
  const { index } = request.params;
  // As duas linhas tem o mesmo objetivo, porem a linha acima usa desestruturação
  //const id = request.params.id

  return response.json(users[index]);
});

//Cria novo usuario
server.post('/users', (request, response) => {
  const { name } = request.body;
  users.push(name);
  response.json(users);
});

// Edita um usuario
server.put('/users/:index', (request, response) => {
  const { index } = request.params;
  const { name } = request.body;

  users[index] = name;

  return response.json(users);
});

// Exclui um usuario
server.delete('/users/:index',(request,response) => {
  const { index } = request.params;
  
  users.splice(index, 1);
  
  return response.send();
});

server.listen(3000);

