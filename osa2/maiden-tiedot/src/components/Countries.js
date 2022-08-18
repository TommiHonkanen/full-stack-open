import Weather from "./Weather.js"

const Countries = (props) => {
    
    if (props.countriesToShow.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (props.countriesToShow.length === 1) {
        const country = props.countriesToShow[0]

        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area}</p>
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map((language) => {
                        return <li key={language}>{language}</li>
                    })}
                </ul>
                <img height="150" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                <Weather capital={country.capital[0]} />
            </div>
        )

    } else {
        return (
            <div>
                {props.countriesToShow.map(country => {
                    return (
                    <div key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => props.onClick(country.name.common)}>show</button>
                    </div>
                    )})}
            </div>
        )
    }

    
}

export default Countries