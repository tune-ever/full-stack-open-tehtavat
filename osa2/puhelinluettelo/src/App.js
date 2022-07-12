import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import notes from './services/notes'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const addData = (event) => {
    const nameObject = {
      name:newName,
      number: newNumber
    }
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      const findingId = persons.filter(e => e.name === newName)
      const id = findingId[0].id
      if(window.confirm(`${newName} is already added to the
      phonebook, replace old number with a new one?`)){
          noteService
          .update(id, nameObject)
          .then(updatePersons)
      }
      setNewName('')
      setNumber('')
    }
    else{
      noteService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNumber('')
        })
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

  const handleDelete = (id) => {
    if(window.confirm(`Delete ${persons[id-1].name}?`)){
      noteService
      .deleteName(id)
      .then(updatePersons)
    }
  }

  const updatePersons = () => {
    noteService
      .getAll()
      .then(response => setPersons(response.data))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add new data</h2>
      <AddPerson addData={addData} newName={newName} handleNameChange={handleNameChange}
            newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} persons={persons} filter={filter} />
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
        <Person handleDelete={props.handleDelete} id={person.id} key={person.name} name={person.name} number={person.number} />
      )
  )
}

const Person = (props) =>
 <div><p>{props.name} {props.number}</p>
  <button onClick={() => props.handleDelete(props.id)}>delete</button>
 </div>

export default App