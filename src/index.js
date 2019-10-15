const express = require('express');

const server = express();

//Usando route params

const users = ['Gustavo','João','Paulo'];

server.get('/users/:index', (request,response) => {
  const { index } = request.params;
  // As duas linhas tem o mesmo objetivo, porem a linha acima usa desestruturação
  //const id = request.params.id

  return response.json(users[index]);
});

// Usando query params 

// server.get('/teste', (request,response) => {
  
//   const nome = request.query.nome; 

//   return response.status(200).json({ message : `Hello ${nome}`});
// });

server.listen(3000);

