const express = require('express');
const clients = require('./bd/clients');
require('dotenv').config()
const app = express();
const cors = require('cors') 
const compression = require('compression')
const bodyParser = require('body-parser')

app.use(compression())
app.use(cors())
app.use(bodyParser.json({ limit: '90mb', extended: true }))

app.get('/buscar-clientes', async (req, res) => {
   try {
      const result = await clients.getClients();
      res.status(200).send(result);
   } catch (error) {
      res.status(400).send(error);
   }
});

app.post('/buscar-cliente', async (req, res) => {
   const { cliente_id } = req.body;
   try {
      const resultCliente = await clients.getClient({ cliente_id });
      const resultAdress = await clients.getAddress({ cliente_id });
      
      res.status(200).send({cliente: resultCliente[0].client[0], enderecos: resultAdress[0].address});
   } catch (error) {
      res.status(400).send(error);
   }
});

app.post('/excluir-cliente', async (req, res)=> {
   const { clientId } = req.body;
   try {
      await clients.removeClient({ id: clientId });
      await clients.removeAddress({ id: clientId });
      res.status(200).send({result: true});
   } catch (error) {
      res.status(400).send(error);
   }
})

app.post('/adicionar-cliente', async (req, res)=> {
   const { bairro, cep, complemento, logradouro, nascimento, nome, numero, sexo, tipo, uf } = req.body;

   try {
      const resultClient = await clients.addClient({ nome, nascimento, sexo });
      if(resultClient.length > 0 && resultClient[0].client_id){
         let id = resultClient[0].client_id;
         await clients.addAddress({ cep, logradouro, numero, uf, bairro, complemento, tipo, id })
         res.status(200).send({id});
      }else{
         throw Error();
      }
   } catch (error) {
      res.status(400).send(error);
   }
})

app.post('/atualizar-cliente', async (req, res)=> {
   const { bairro, cep, clientId, complemento, logradouro, nascimento, nome, numero, sexo, tipo, uf, idEndereco } = req.body;

   try {
      const resultClient = await clients.updateClient({ clientId, nome, nascimento, sexo });
      const resultEndereco = await clients.updateAddress({ cep, logradouro, numero, uf, bairro, complemento, tipo, clientId, idEndereco })
      let result = {};
      if(resultClient.length > 0 && resultEndereco.length > 0){
         result = {...resultClient[0], ...resultEndereco[0]}
      }
      res.status(200).send(result);
   } catch (error) {
      res.status(400).send(error);
   }
})

app.listen(3333, ()=> console.log('Servidor rodando na porta 3333'));