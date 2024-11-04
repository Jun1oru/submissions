import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import Search from './components/Search';
import Results from './components/Results';

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (search !== "") {
      countriesService
        .search(search)
        .then(results => setResults(results));
    }
    else setResults(null);
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      <Search
        value={search}
        onChange={handleSearch}
      />
      <Results
        results={results}
        setResults={setResults}
      />
    </div>
  )
};

export default App;