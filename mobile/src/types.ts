export interface endereco{
   cep: string;
   logradouro: string;
   numero: string;
   uf: string;
   tipo: number;
   complemento?: string;
   bairro?: string;
}

export interface Cliente{
   nome: string;
   nascimento: string;
   sexo: number;
   endereco: endereco[];
}

export interface FormData{
   nome: string;
   nascimento: string;
   sexo: number;
   endereco: endereco;
   cep: string;
   logradouro: string;
   numero: string;
   uf: string;
   tipo: number;
   complemento?: string;
   bairro?: string;
}