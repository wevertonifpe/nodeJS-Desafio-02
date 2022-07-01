// Importação CommonJS modules
const express = require('express');
const users = require('./routes/users');
const students = require('./routes/students');
const Instructors = require('./routes/instructors');

// Criar aplicação WEB express
const app = express();
// Midlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Arquivos de rotas
app.use('/users', users);
app.use('/students', students);
app.use('/instructors', Instructors);



// Rotas (End Points)
app.get('/', (req, res) => {
  // console.log('Rota / foi chamada.');
  res.send('Esta é a rota raiz da aplicação!');
});

// Exportar a aplicação
module.exports = app;
