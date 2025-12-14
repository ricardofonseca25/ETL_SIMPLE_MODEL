// Imports:

import api_default from './script_modules/api_default.js';
import log_extendido from './script_modules/log_extendido.js';

// Variáveis globais:

let url_default = '';
let get_obtido = {}
let cont = 0

// Tokens de autenticação para as APIs:

let token_origem = ''
let token_destino = ''

// Get dos dados da API origem:

async function get_data() {
    
  // Chama a API para obter os dados dentro do bloco TRY:

    try {
      const data = await api_default({ url: url_default, method: 'GET', token: token_origem });
      if (data) {

        const items = Array.isArray(data) ? data : [data];

        // Percorre (FOR EACH) os itens obtidos e armazena no array global:
        
        items.forEach(item => {
          get_obtido[item.id] = {
            id: ++cont,
            descricao: item.descricao
          };
        });
      }
      // Retorna os dados obtidos:

      return get_obtido;
    } catch (err) {
      console.error('Failed to fetch data:', err && err.message ? err.message : err);
      throw err;
    }
}

// Post dos dados para a API destino via loop async:

async function post_data() {

  await get_data(); // espera a API terminar

  for (const key in get_obtido) {
    
    // Percorre o array de dados obtidos e monta o body para o POST:

    const body = {
      id: get_obtido[key].id,
      descricao: get_obtido[key].descricao
    };

      const data = await api_default({ url: url_default, method: 'POST', token: token_destino, body: body });

      if (data) {
       log_extendido(data);
      }
   
  }
}

post_data(); // chama a função para postar os dados