import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter.js"
import Countries from "./components/Countries.js"

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const selectCountry = (name) => {
    setNewFilter(name)
  } 

  return (
    <div>
      <h1>Country finder</h1>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries onClick={selectCountry} countriesToShow={countriesToShow} />
    </div>
  )
}

export default App