db.clientes.insertMany([
  {
    nome: "Yasmin Paz",
    cpf: "123.456.789-00",
    email: "yasmin@email.com",
    data_nasc: "2000-12-12",
    telefone: "99999-9999",
    vendas: [
      {
        data: new Date("2025-07-07"),
        total: 300.00,
        status_pagamento: "Pago",
        itens: [
          { ingresso_id: ObjectId(), valor: 150.00 },
          { ingresso_id: ObjectId(), valor: 150.00 }
        ]
      }
    ]
  },
  {
    nome: "Guilherme Dias",
    cpf: "987.654.321-00",
    email: "guilherme@email.com",
    data_nasc: "1997-11-11",
    telefone: "99988-7766",
    vendas: [
      {
        data: new Date("2025-06-15"),
        total: 332.00,
        status_pagamento: "Pendente",
        itens: [
          { ingresso_id: ObjectId(), valor: 166.00 },
          { ingresso_id: ObjectId(), valor: 166.00 }
        ]
      }
    ]
  }
]);
