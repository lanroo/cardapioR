import axios from 'axios';
import { MenuItem } from '../types'; // Certifique-se de que o tipo MenuItem está corretamente definido

// Defina a URL base da API e a chave de API obtida no OpenMenu
const API_BASE_URL = 'https://api.openmenu.com/v2/restaurants';
const API_KEY = 'SUA_API_KEY_AQUI'; // Substitua com sua chave de API obtida no OpenMenu

// Função para buscar os itens do cardápio de um restaurante
export const fetchMenuItems = async (restaurantId: string): Promise<MenuItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${restaurantId}/menu`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`, // Passando a chave da API nos headers
      }
    });

    return response.data.items;  // Supondo que a API retorne os itens do menu no campo 'items'
  } catch (error) {
    console.error('Erro ao buscar itens do cardápio:', error);
    return [];  // Retorna um array vazio em caso de erro
  }
};
