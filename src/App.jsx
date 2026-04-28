import { useState } from 'react';
import './App.css'; 

function App() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const query = search.trim().toLowerCase();
    if (!query) return;

    setLoading(true);
    setError(false);
    setPokemon(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (!res.ok) throw new Error('Not found');
      
      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="center">
      <h1>Pokedex</h1>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="counter"
          style={{ width: '250px', marginRight: '10px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="counter" >
          buscar
        </button>
      </form>

      {error && <p style={{ fontWeight: 'bold' }}>pokemon no encontrado.</p>}
      {loading && <p>Buscando...</p>}

      {pokemon && !loading && (
        <div 
          style={{
            background: 'var(--code-bg)',
            border: '1px solid var(--border)',
            padding: '20px',
            width: '320px',
            boxShadow: 'var(--shadow)',
            textAlign: 'center'
          }}
        >
          <h2 style={{ textTransform: 'uppercase', marginBottom: '15px' }}>
            {pokemon.name}
          </h2>
          
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name}
            style={{ width: '200px', height: '200px', objectFit: 'contain' }}
          />
          
          <div style={{ textAlign: 'left', marginTop: '20px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '5px' }}>stats</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pokemon.stats.map((s, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
                  <strong style={{ color: 'var(--text)' }}>{s.stat.name.toUpperCase()}</strong> 
                  <span>{s.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;