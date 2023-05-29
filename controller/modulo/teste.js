let cadastro_voluntario = {
  voluntario: {
    nome: "maria",
    rg: "54",
    cpf: "52",
    foto: "url",
    diploma: "url",
  },
  endereco: {
    cep: "066",
    rua: "rua",
    bairro: "bairro",
    cidade: "cidade",
    estado: "estado",
    pais: "pais",
  },
};

let cadastro_empresa = {
  cnpj: "066",
  razao_social: "MKCV",
  email: "@mkcv",
  telefone: "119",
  mensagem: 1,
  tipo_contato: 2,
};

let cadastro_escola = {
  escola: {
    nome_escola: "E.E.",
    cnpj: "0654984001",
    responsavel: "Maria do Bairro soy",
    email: "@e.e.com",
    telefone: "119",
  },
  endereco: {
    cep: "066",
    rua: "rua",
    bairro: "bairro",
    cidade: "cidade",
    estado: "estado",
    pais: "pais",
  },
};

let cadastro_palestra = {
  escola: 1,
  voluntarios: [
    {
      id: 1,
      nome: "Só o nome",
    },
    {
      id: 2,
      nome: "Só o nome",
    },
  ],
  empresa: [
    {
      id: 1,
      razao_social: "E.E. Maria Soares Santos",
    },
    {
      id: 2,
      razao_social: "E.E. Maria Soares Santos",
    },
  ],
  objetivo: "Atenuar a desigualdade social",
  tema: "Desigualdade no Brasil",
  data: "date",
  imagem: [
    {
      id: 1,
      url: "default",
    },
    {
      id: 2,
      url: "default",
    },
  ],
};

/**
 *
 *
 * B.O DO back
 *
 *
 */

let retornoApi = {
  palestras: [
    {
      escola: 'Maria Soares Santos',
      voluntarios: [
        {
          id: 'retorna todos os dados',
        },
        {
          id: 2,
          nome: "Só o nome",
        },
      ],
      empresa: [
        {
          id: 1,
          razao_social: "E.E. Maria Soares Santos",
        },
        {
          id: 2,
          razao_social: "E.E. Maria Soares Santos",
        },
      ],
      objetivo: "Atenuar a desigualdade social",
      tema: "Desigualdade no Brasil",
      data: "date",
      imagem: [
        {
          id: 1,
          url: "default",
        },
        {
          id: 2,
          url: "default",
        },
      ],
    },
    {
      escola: 1,
      voluntarios: [
        {
          id: 1,
          nome: "Só o nome",
        },
        {
          id: 2,
          nome: "Só o nome",
        },
      ],
      empresa: [
        {
          id: 1,
          razao_social: "E.E. Maria Soares Santos",
        },
        {
          id: 2,
          razao_social: "E.E. Maria Soares Santos",
        },
      ],
      objetivo: "Atenuar a desigualdade social",
      tema: "Desigualdade no Brasil",
      data: "date",
      imagem: [
        {
          id: 1,
          url: "default",
        },
        {
          id: 2,
          url: "default",
        },
      ],
    },
    {
      escola: 1,
      voluntarios: [
        {
          id: 1,
          nome: "Só o nome",
        },
        {
          id: 2,
          nome: "Só o nome",
        },
      ],
      empresa: [
        {
          id: 1,
          razao_social: "E.E. Maria Soares Santos",
        },
        {
          id: 2,
          razao_social: "E.E. Maria Soares Santos",
        },
      ],
      objetivo: "Atenuar a desigualdade social",
      tema: "Desigualdade no Brasil",
      data: "date",
      imagem: [
        {
          id: 1,
          url: "default",
        },
        {
          id: 2,
          url: "default",
        },
      ],
    },
  ],
};

console.log(cadastro_palestra);
