import Pagamento from '../constants/Constants';

export default [
  {
    id: Math.random(),
    foto: 'https://instagram.fbhz6-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82831799_2946898952040961_8657796788968751104_n.jpg?_nc_ht=instagram.fbhz6-1.fna.fbcdn.net&_nc_ohc=j1rjvPOFvKQAX8ZWCAy&oh=44a18cfffc91afe7daf5c1d2b2b5c586&oe=5EC0D102',
    nome: 'Bruno Alcântara',
    endereco: 'Rua Professor Hugo Werneck, 470, Asteca',
    dataHora:'Sat Feb 01 2020 12:47:14 GMT-0300 (Horário Padrão de Brasília)',
    pedidos: [
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.47, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 5.02, },
      { id: Math.random(), produto: 'Sorvete', sabor: 'Morango', quantidade: 15, preco: 2.55, },
    ],
    formaPagamento: Pagamento.DINHEIRO,
    total: 12.45,
  },
  {
    id: Math.random(),
    foto: 'https://instagram.fbhz6-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82862585_478450756406510_3430617699049275392_n.jpg?_nc_ht=instagram.fbhz6-1.fna.fbcdn.net&_nc_ohc=9uf56M_K9zUAX_UXPUu&oh=18cdda3b711e64b549343f221f47f11f&oe=5EBD935C',
    nome: 'Ana Caroline',
    endereco: 'Rua Professor Hugo Werneck, 470, Asteca',
    dataHora:'Sat Feb 01 2020 12:47:14 GMT-0300 (Horário Padrão de Brasília)',
    pedidos: [
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.45, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 5.50, },
      { id: Math.random(), produto: 'Sorteve', sabor: 'Morango', quantidade: 15, preco: 2.55, },
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.75, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 3.87, },
      { id: Math.random(), produto: 'Sorteve', sabor: 'Morango', quantidade: 15, preco: 2.57, },
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.45, },
      { id: Math.random(), produto: 'Sorteve', sabor: 'Morango', quantidade: 15, preco: 2.51, },
    ],
    formaPagamento: Pagamento.CARTAO,
    total: 17.10,
  },
  {
    id: Math.random(),
    foto: 'https://instagram.fbhz6-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82831799_2946898952040961_8657796788968751104_n.jpg?_nc_ht=instagram.fbhz6-1.fna.fbcdn.net&_nc_ohc=j1rjvPOFvKQAX8ZWCAy&oh=44a18cfffc91afe7daf5c1d2b2b5c586&oe=5EC0D102',
    nome: 'Bruno Alcântara',
    endereco: 'Rua Professor Hugo Werneck, 470, Asteca',
    dataHora:'Sat Feb 01 2020 12:47:14 GMT-0300 (Horário Padrão de Brasília)',
    pedidos: [
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.47, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 5.02, },
      { id: Math.random(), produto: 'Sorvete', sabor: 'Morango', quantidade: 15, preco: 2.55, },
    ],
    formaPagamento: Pagamento.DINHEIRO,
    total: 12.45,
  },
  {
    id: Math.random(),
    foto: 'https://instagram.fbhz6-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82862585_478450756406510_3430617699049275392_n.jpg?_nc_ht=instagram.fbhz6-1.fna.fbcdn.net&_nc_ohc=9uf56M_K9zUAX_UXPUu&oh=18cdda3b711e64b549343f221f47f11f&oe=5EBD935C',
    nome: 'Ana Caroline',
    endereco: 'Rua Professor Hugo Werneck, 470, Asteca',
    dataHora:'Sat Feb 01 2020 12:47:14 GMT-0300 (Horário Padrão de Brasília)',
    pedidos: [
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.45, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 5.50, },
      { id: Math.random(), produto: 'Sorteve', sabor: 'Morango', quantidade: 15, preco: 2.55, },
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.75, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 3.87, },
      { id: Math.random(), produto: 'Sorteve', sabor: 'Morango', quantidade: 15, preco: 2.57, },
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.45, },
      { id: Math.random(), produto: 'Sorteve', sabor: 'Morango', quantidade: 15, preco: 2.51, },
    ],
    formaPagamento: Pagamento.CARTAO,
    total: 17.10,
  },
  {
    id: Math.random(),
    foto: 'https://instagram.fbhz6-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82831799_2946898952040961_8657796788968751104_n.jpg?_nc_ht=instagram.fbhz6-1.fna.fbcdn.net&_nc_ohc=j1rjvPOFvKQAX8ZWCAy&oh=44a18cfffc91afe7daf5c1d2b2b5c586&oe=5EC0D102',
    nome: 'Bruno Alcântara',
    endereco: 'Rua Professor Hugo Werneck, 470, Asteca',
    dataHora:'Sat Feb 01 2020 12:47:14 GMT-0300 (Horário Padrão de Brasília)',
    pedidos: [
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.47, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 5.02, },
      { id: Math.random(), produto: 'Sorvete', sabor: 'Morango', quantidade: 15, preco: 2.55, },
    ],
    formaPagamento: Pagamento.DINHEIRO,
    total: 12.45,
  },
  {
    id: Math.random(),
    foto: 'https://instagram.fbhz6-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82862585_478450756406510_3430617699049275392_n.jpg?_nc_ht=instagram.fbhz6-1.fna.fbcdn.net&_nc_ohc=9uf56M_K9zUAX_UXPUu&oh=18cdda3b711e64b549343f221f47f11f&oe=5EBD935C',
    nome: 'Ana Caroline',
    endereco: 'Rua Professor Hugo Werneck, 470, Asteca',
    dataHora:'Sat Feb 01 2020 12:47:14 GMT-0300 (Horário Padrão de Brasília)',
    pedidos: [
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.45, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 5.50, },
      { id: Math.random(), produto: 'Sorteve', sabor: 'Morango', quantidade: 15, preco: 2.55, },
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.75, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 3.87, },
      { id: Math.random(), produto: 'Sorteve', sabor: 'Morango', quantidade: 15, preco: 2.57, },
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.45, },
      { id: Math.random(), produto: 'Sorteve', sabor: 'Morango', quantidade: 15, preco: 2.51, },
    ],
    formaPagamento: Pagamento.CARTAO,
    total: 17.10,
  }, 
  {
    id: Math.random(),
    foto: 'https://instagram.fbhz6-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82831799_2946898952040961_8657796788968751104_n.jpg?_nc_ht=instagram.fbhz6-1.fna.fbcdn.net&_nc_ohc=j1rjvPOFvKQAX8ZWCAy&oh=44a18cfffc91afe7daf5c1d2b2b5c586&oe=5EC0D102',
    nome: 'Bruno Alcântara',
    endereco: 'Rua Professor Hugo Werneck, 470, Asteca',
    dataHora:'Sat Feb 01 2020 12:47:14 GMT-0300 (Horário Padrão de Brasília)',
    pedidos: [
      { id: Math.random(), produto: 'Doce', sabor: 'Chocolate', quantidade: 15, preco: 3.47, },
      { id: Math.random(), produto: 'Bolo no pote', sabor: 'Maracujá', quantidade: 3,preco: 5.02, },
      { id: Math.random(), produto: 'Sorvete', sabor: 'Morango', quantidade: 15, preco: 2.55, },
    ],
    formaPagamento: Pagamento.DINHEIRO,
    total: 12.45,
  },
]