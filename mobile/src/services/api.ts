import axios from 'axios';

const api = axios.create({
   baseURL: 'http://192.168.5.22:3333',
   withCredentials: false
})

export async function buscarCep(cep: string){
   try {
      // Buscar endereço
      let auxCep = cep.includes('-') ? cep.replace('-','') : cep;
      const result = await axios.get(`https://viacep.com.br/ws/${auxCep}/json/`);
      const { data, status } = result;
      if(data && status == 200){
         return data;
      }else{
         throw Error();
      }
      // Fim da busca
   } catch (error) {
      return error;
   }
}

export async function buscarClientes(){
   try {
      const result = await api.get('/buscar-clientes');
      const { data, status } = result;
      if(data && status == 200){
         return data.buscar_clientes;
      }else{
         throw Error();
      }
   } catch (error) {
      return error;
   }
}

export async function buscarCliente(cliente_id: number){
   try {
      const result = await api.post('/buscar-cliente', { cliente_id });
      const { data, status } = result;
      if(data && status == 200){
         return data;
      }else{
         throw Error();
      }
   } catch (error) {
      return error;
   }
}

export async function adicionarCliente( dados ){
   try {
      const result = await api.post('/adicionar-cliente',  { ...dados });
      const { data, status } = result;
      if(data && status == 200){
         return data;
      }else{
         throw Error();
      }
   } catch (error) {
      return error;
   }
}

export async function atualizarCliente( dados ){
   try {
      const result = await api.post('/atualizar-cliente',  { ...dados });
      const { data, status } = result;
      if(data && status == 200){
         return data;
      }else{
         throw Error();
      }
   } catch (error) {
      return error;
   }
}

export async function excluirCliente( clientId: number ){
   try {
      const result = await api.post('/excluir-cliente',  { clientId });
      const { data, status } = result;
      if(data && status == 200){
         return data;
      }else{
         throw Error();
      }
   } catch (error) {
      return error;
   }
}
