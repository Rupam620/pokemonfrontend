import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './component.css';
import { useNavigate } from 'react-router-dom';

const PokemonList = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://pokemonbackend-cwnf.onrender.com/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  const goHome=()=>{
    navigate('/')
  }
  const deleteAll = async () => {
    try {
      await axios.delete('https://pokemonbackend-cwnf.onrender.com/api/users');
      setUsers([]); // Clear the list after deleting all users
    } catch (error) {
      console.error("Error deleting all users:", error);
    }
  };

  const handleDelete = async (pokemonOwnerName) => {
    try {
      await axios.delete(`https://pokemonbackend-cwnf.onrender.com/api/users/${pokemonOwnerName}`);
      // Update the local state to reflect the deletion
      setUsers(users.filter(user => user.pokemonOwnerName !== pokemonOwnerName));
    } catch (error) {
      console.error("Error deleting the trainer:", error);
    }
  };

  return (
    <div className='pink-div'>
     <button  className=" button-style-1"onClick={goHome}>Home</button>
      <button className=" button-style-2" onClick={deleteAll}>Delete All</button>
      <table>
        <thead>
          <tr>
            <th>Pokemon Owner Name</th>
            <th>Pokemon Name</th>
            <th>Pokemon Ability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            user.pokemons.map((pokemon, index) => (
              <tr key={`${user.pokemonOwnerName}-${index}`}>
                <td>{user.pokemonOwnerName}</td>
                <td>{pokemon.pokemonName}</td>
                <td>{pokemon.pokemonAbility}</td>
                <td>
                  <button onClick={() => handleDelete(user.pokemonOwnerName)}>Delete Trainer</button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonList;
