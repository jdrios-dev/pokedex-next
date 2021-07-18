import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

const [pokes, setPokes] = useState([])
const [nextFetch, setNextFetch] = useState('')
const [currentPoke, setCurrentPoke] = useState({})

  const fetchApi = async(url) => {
    const data = await fetch(url)
    const resp = await data.json()
    const next = await resp.next
    const pokes = await resp.results
    setNextFetch(next)
    setPokes(pokes)
  }

  useEffect(() => {
    fetchApi('https://pokeapi.co/api/v2/pokemon')
  }, [])

  const handleNewPoke = async(url) => {
    const data = await fetch(url)
    const poke = await data.json()
    setCurrentPoke(poke)
  }

  return (
    <div className="App">
      <div className='button_container'>
        {
          pokes.map(poke =><button key={poke.name} onClick={() => handleNewPoke(poke.url)}>{poke.name}</button>)
        }
      </div>
  {
    currentPoke.name ?
    (<div className='poke-card'>
      <h1>{currentPoke.name}</h1>
      <h3>Id: {currentPoke.id}</h3>
      <img alt={currentPoke.name} src={currentPoke.sprites.front_default} />
      <img alt={currentPoke.name} src={currentPoke.sprites.back_default} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flexDirection: 'column' }}>
      <h3>Type:</h3>
      {
        currentPoke.types.length > 0 && currentPoke.types.map(item => <p> {item.type.name}</p>)
      }
      </div>
      <div  style={{ flexDirection: 'column' }}>
      <h3>Abilities:</h3>
      {
        currentPoke.abilities.length > 0 && currentPoke.abilities.map(item => <p> {item.ability.name}</p>)
      }
      </div>
      </div>

    </div> )
    :
    (<h1>Select one poke</h1>)
  }

<button onClick={() => fetchApi(nextFetch) }>More Pokes</button>

    </div>
  )
}

export default App
