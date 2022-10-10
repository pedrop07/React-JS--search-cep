import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IMaskInput } from 'react-imask'
import { useState } from 'react'
import './App.css'
import api from './services/api'

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState(null);

  async function handleSearch(e){
    e.preventDefault();

    if(input.length < 9){
      alert('Digite um CEP valido');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      response.data.hasOwnProperty('erro') ? alert('CEP invalido') : setCep(response.data);
      
    } catch (error) {
      alert('erro ao Buscar CEP');
      setInput("");
    }    
  }

  return (
    <>
      <div className="main--container">
        <h1>Buscador de CEP</h1>
        <div className="input--container">
          <form onSubmit={handleSearch}>
            <IMaskInput 
              mask="00000-000"
              type="text"
              value={input}
              placeholder="Digite o CEP"
              className='inputCep'
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />

            <button className='searchBtn' onClick={handleSearch} >
              <FontAwesomeIcon icon={faMagnifyingGlass}  />
            </button>
          </form>
        </div>
        
        {cep && (
          <div className='result--container'>
              <h2 >CEP: {cep.cep}</h2>
              <h3>Estado: {cep.uf}</h3>
              <h3>Cidade: {cep.localidade}</h3>
              <h3>Bairro: {cep.bairro}</h3>
              <h3>Rua: {cep.logradouro}</h3>
          </div>
        )}
      </div>
    </>
  )
}

export default App
