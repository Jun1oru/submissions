import countriesService from '../services/countries';
import Weather from './Weather';

const Results = ({ results, setResults }) => {
    const handleShow = (search) => {
        countriesService
        .search(search)
        .then(results => setResults(results));
    }

    if (results !== null) {
        if (results.length === 1) {
            return (
                <div>
                    <div key={results[0].name.common}>
                        <h1>{results[0].name.common}</h1>
                        <div>capital {results[0].capital[0]}</div>
                        <div>area {results[0].area}</div>
                        <h2>languages: </h2>
                        <ul>
                            {Object.keys(results[0].languages).map(language =>
                                <li key={language}>
                                    {results[0].languages[language]}
                                </li>
                            )}
                        </ul>
                        <img
                            src={results[0].flags["png"]}
                            alt={results[0].flags["alt"]}
                        />
                        <Weather
                            capital={results[0].capital[0]}
                        />
                    </div>
                </div>
            );
        } else if (results.length <= 10) {
            return (
                <div>
                    {results.map(country =>
                        <div key={country.name.common}>
                            {country.name.common}
                            <button type="button"
                                onClick={() => handleShow(country.name.common)}>
                                show
                            </button>
                        </div>
                    )}
                </div>
            )
        } else {
            return (
                <div>
                    Too many matches, specify another filter
                </div>
            )
        }
    } else
        return (
            <div>
                Search a country
            </div>
        );
}

export default Results;