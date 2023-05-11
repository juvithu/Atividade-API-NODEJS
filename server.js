const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Configura o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura o Mongoose
mongoose.connect('mongodb://localhost:27017/api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conexão com o MongoDB estabelecida com sucesso.');
});

// Define as rotas da API
app.use('/api', require('./routes'));

// Inicia o servidor
app.listen(port, function() {
  console.log(`Servidor rodando na porta ${port}.`);
});
