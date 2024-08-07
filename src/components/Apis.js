// src/api.js
import axios from 'axios';

const API_URL = 'https://pokemonbackend-cwnf.onrender.com/api/users';

export const addPokemon = async (trainerData) => {
    console.log("api called");
  try {
    const response = await axios.post(API_URL, trainerData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
