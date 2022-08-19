import { useState, useEffect } from 'react'
import Filter from "./components/Filter.js"
import PersonForm from "./components/PersonForm.js"
import Persons from "./components/Persons.js"
import Notification from "./components/Notification.js"
import ErrorNotification from "./components/ErrorNotification.js"
import peopleService from "./services/people.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      changeNumber(newName, newNumber)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    peopleService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
  }

  const changeNumber = (name, number) => {
    const person = persons.find(person => person.name === name)

    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
      const changedPerson = {...person, number: number}
      peopleService.update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Changed ${name}'s number`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${name} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== name))
        })
    }
  }

  const deletePerson = (name) => {
    const person = persons.find(person => person.name === name)

    if (window.confirm(`Delete ${person.name} ?`)) {
      peopleService.remove(person.id)
      setPersons(persons.filter(p => p.name !== person.name))
      setSuccessMessage(`Deleted ${name}`)
        setTimeout(() => {
          setSuccessMessage(null)
      }, 3000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
 
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h1>add a new</h1>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} delete={deletePerson}/>
    </div>
  )

}

export default App