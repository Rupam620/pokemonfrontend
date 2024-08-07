import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './component.css'
import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [pokemonIntervals, setPokemonIntervals] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://pokemonbackend-cwnf.onrender.com/api/users');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  console.log(selectedUser);
  const handleUserChange = (e) => {
    const user = e.target.value;
    setSelectedUser(user);
    const trainer = users.find(u => u.pokemonOwnerName === user);
    setPokemons(trainer ? trainer.pokemons : []);
  };

  console.log( pokemons);
 
const redirectUser =()=>{
    navigate('/add-pokemon')
}

const redirectPokemonlist = ()=>{
    navigate('/pokemon-list')
}

  const handlePokemonGo = (index) => {
    const pokemon = pokemons[index];
    const interval = setInterval(() => {
      const element = document.getElementById(`pokemon-${index}`);
      const rect = element.getBoundingClientRect();
      const container = document.querySelector('.pokemon-container').getBoundingClientRect();
      
      let newX = rect.left + pokemon.speed * (pokemon.direction === 'right' ? 1 : -1);
      let newY = rect.top + pokemon.speed * (pokemon.direction === 'down' ? 1 : -1);

      if (newX < container.left || newX > container.right || newY < container.top || newY > container.bottom) {
        element.style.visibility = 'hidden';
      } else {
        element.style.transform = `translate(${newX - rect.left}px, ${newY - rect.top}px)`;
      }
    }, 1000);

    setPokemonIntervals(prev => ({ ...prev, [index]: interval }));
  };

  const handlePokemonFlee = (index) => {
    const element = document.getElementById(`pokemon-${index}`);
    element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
  };

  const handlePokemonCease = (index) => {
    clearInterval(pokemonIntervals[index]);
  };

  return (
    <div>
     
       <h1 className='mt'>List of Pokemon Owner</h1>

       <button className='button-style-1' onClick={redirectUser}> Add Pokemon </button>
       <button className='button-style-1 mr' onClick={redirectPokemonlist}> List Pokemon Users</button>
      <select className = "input-field select-1 "onChange={handleUserChange} value={selectedUser}>
        <option className = "select-2" value="">Select User</option>
        {users.map(user => (
          <option key={user.pokemonOwnerName} value={user.pokemonOwnerName}>
            {user.pokemonOwnerName}
          </option>
        ))}
      </select>

      <div className=" pink-div" 
      >
        {pokemons.map((pokemon, index) => (
          <div

            className='center'
            key={index}
            id={`pokemon-${index}`}
          >
        <table>
        <thead className='table-headers'>
          <tr>
            <th>Number of pokemon</th>
            <th>Ability of Pokemon</th>
            <th>Number of Pokemon</th>
          </tr>
        </thead>
        <tbody>
          
            <tr key={index}>
              <td className='table-headers'>{Object.keys(pokemons).length}</td>
              <td className='table-headers'>  {pokemon.pokemonAbility}</td>
              <td className='table-headers'>{Object.keys(pokemons).length}</td>
            </tr>
          
        </tbody>
      </table>

           
            <button onClick={() => handlePokemonGo(index)}>Pokemon Go</button>
            <button onClick={() => handlePokemonFlee(index)}>Pokemon Flee</button>
            <button onClick={() => handlePokemonCease(index)}>Pokemon Cease</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
