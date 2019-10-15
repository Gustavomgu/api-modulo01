const express = require('express');

const server = express();

// É necessário dizer para o express que ele vai usar JSON para que ele possa receber informações nesse formato
server.use(express.json());

//Usando route params

const users = ['Gustavo','João','Paulo'];

//Middleware global - neste caso ele exibe o log da aplicação
server.use((request, response, next) => {
  //Usando o console.time e console.timeEnd é possivel calcular o tempo que a requisição que o next() chamou gastou para executar
  console.time('Request');
  console.log(`Metodo : ${request.method}; URL : ${request.url};`);
  
  //utilizando esta função a api vai chamar a rota que foi selecionada pelo cliente
  next();

  console.timeEnd('Request');
});

//Middleware local - para utiliza-lo é necessário passar essa função como parametro das chamadas das rotas
function checkUserExists(request,response,next) {
  if (!request.body.name) {
    return response.status(400).json({ error : 'User not found!'})
  }

  return next();
}

function checkUserIsInArray(request, response, next) {
  const user = users[request.params.index]; 

  if (!user) {
    return response.status(400).json({ error : 'User does not exists!'});
  }

  request.user = user;

  return next();
}

// Ler todos os usuarios
server.get('/users', (request,response) => {
  return response.json(users);
})

// Ler apenas um usuario
// checkUserIsInArray é um middleware
server.get('/users/:index', checkUserIsInArray, (request,response) => {
  const { index } = request.params;
  // As duas linhas tem o mesmo objetivo, porem a linha acima usa desestruturação
  //const id = request.params.id

  //return response.json(users[index]);
  // Essa informação presente em request.user foi preenchida no middleware checkUserIsInArray
  return response.json(request.user);
});

//Cria novo usuario
//checkUserExists é um middleware local
server.post('/users',checkUserExists, (request, response) => {
  const { name } = request.body;
  users.push(name);
  response.json(users);
});

// Edita um usuario
//checkUserExists é um middleware local
//checkUserIsInArray é outro middleware
server.put('/users/:index',checkUserExists, checkUserIsInArray, (request, response) => {
  const { index } = request.params;
  const { name } = request.body;

  users[index] = name;

  return response.json(users);
});

// Exclui um usuario
// checkUserIsInArray é um middleware
server.delete('/users/:index',checkUserIsInArray,(request,response) => {
  const { index } = request.params;
  
  users.splice(index, 1);
  
  return response.send();
});

server.listen(3000);

