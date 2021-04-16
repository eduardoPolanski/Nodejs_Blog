const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});

//Conexão ao banco de dados
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', ()=>{
    console.error('ERRO: '+err.message);
});

//Carregando os Models
require('./models/Post');    

 
const app = require('./app');
app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), ()=>{
    console.log('Servidor rodando na porta: '+server.address().port);
});
          