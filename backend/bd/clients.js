const query = require('../connection');
const queryLivre = require('../ConnectionFree');

exports.getClients = async params => {
   const select = "select buscar_clientes()"
   return await query(select, params);
}

exports.getClient = async params => {
   const select = `
      select coalesce(jsonb_agg(z), '[]') as client from ( 
         select * from clients where active = true and client_id = $cliente_id
      )z
   `
   return await queryLivre(select, params);
}

exports.addClient = async params => {
   const select = "insert into clients(name, birthday, sex_id) values ($nome, $nascimento, $sexo) returning client_id"
   return await queryLivre(select, params);
}

exports.updateClient = async params => {
   const select = "update clients set name = $nome, birthday = $nascimento, sex_id = $sexo where client_id = $clientId returning client_id"
   return await queryLivre(select, params);
}

exports.removeClient = async params => {
   const select = `update clients set active = false where client_id = $id`
   return await queryLivre(select, params);
}

exports.getAddress = async params => {
   const select = "select coalesce(jsonb_agg(z), '[]') as address from ( select * from address_client where active = true and client_id = $cliente_id )z"
   return await queryLivre(select, params);
}

exports.addAddress = async params => {
   const select = `
      insert into address_client(cep, street, number, uf, district, complement, type_id, client_id) 
      values ($cep, $logradouro, $numero, $uf, $bairro, $complemento, $tipo, $id) returning address_id
   `
   return await query(select, params);
}

exports.updateAddress = async params => {
   const select = `
      update address_client 
      set cep = $cep, street = $logradouro, number = $numero, uf = $uf, district = $bairro, complement = $complemento, type_id = $tipo 
      where client_id = $clientId and address_id = $idEndereco and active = true returning address_id
   `
   return await queryLivre(select, params);
}

exports.removeAddress = async params => {
   const select = `update address_client set active = false where client_id = $id`
   return await queryLivre(select, params);
}