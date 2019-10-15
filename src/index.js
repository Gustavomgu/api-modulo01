const express = require('express');

const server = express();

server.get('/teste', (request,response) => {
  return response.status(200).json({ message : 'Funcionou!'});
});

server.listen(3000);

