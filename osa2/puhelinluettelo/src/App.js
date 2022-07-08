import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addData = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName))
      alert(`${newName} is already in the phonebook`)
    else{
      const nameObject = {
        name:newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNumber('')
    }
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add new data</h2>
      <AddPerson addData={addData} newName={newName} handleNameChange={handleNameChange}
            newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

const AddPerson = (props) =>{
  return (
    <form onSubmit={props.addData}>
      name:
      <input value={props.newName} onChange={props.handleNameChange} />
      <br/>
      number:
      <input value={props.newNumber} onChange={props.handleNumberChange} />
      <button type="submit">add</button>
    </form>
  )
}

const Filter = (props) => {
  return (
  <div>
      filter shown with:<input value={props.filter} onChange={props.handleChange}/>
   </div>
  )
}

const Persons = (props) => {
  const persons = props.persons
  const filter = props.filter
  return (
    persons
      .filter(person => person.name.toLowerCase().includes(filter))
      .map(person => 
        <Person key={person.name} name={person.name} number={person.number} />
      )
  )
}

const Person = (props) => <p>{props.name} {props.number}</p>

export default App