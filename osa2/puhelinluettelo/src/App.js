import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notify, setNotify] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const updateData = (nameObject) => {
    const findingId = persons.filter(e => e.name === newName)
      const id = findingId[0].id
      if(window.confirm(`${newName} is already added to the
      phonebook, replace old number with a new one?`)){
          personService
            .update(id, nameObject)
            .then(updatePersons)
            .then(setNotify("Updated " + newName))
            .then(setTimeout(() => {setNotify("")}, 3000))
            .catch(error => {
              setNotify(JSON.stringify(error.response.data.error))
            })
      }
      setNewName('')
      setNumber('')
  }

  const addData = (event) => {
    const nameObject = {
      name:newName,
      number: newNumber
    }
    event.preventDefault()
    // IF name is already on list, we UPDATE:
    if(persons.some(person => person.name === newName)){
      updateData(nameObject)
    }
    else{
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotify("Added " + newName)
          setTimeout(() => {setNotify("")}, 3000)
          setNewName('')
          setNumber('')
        })
        .catch(error => {
          setNotify(error.response.data)
        })
        .then(setTimeout(() => {setNotify("")}, 3000))
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
    const objectToDelete = persons.filter(e => e.id === id)
    const nameToPrint = objectToDelete[0].name
    if(window.confirm(`Delete ${nameToPrint}?`)){
      personService
      .deleteName(id)
      .then(updatePersons)
      .then(setNotify("Deleted " + nameToPrint))
      .then(setTimeout(() => {setNotify("")}, 3000))
    }
  }

  const updatePersons = () => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notify}/>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add new data</h2>
      <AddPerson addData={addData} newName={newName} handleNameChange={handleNameChange}
            newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} persons={persons} filter={filter} />
    </div>
  )

}

const Notification = ({message}) => {
  if(message.error) 
    return <div className='error'>{message.error}</div>
  if(message === "") 
    return null
  return <div className='notification'>{`${message}`}</div>
}

const AddPerson = (props) =>{
  return (
    <form onSubmit={props.addData}>
      name:
      <input value={props.newName} onChange={props.handleNameChange} />
      <br/>
      number:
      <input value={props.newNumber} onChange={props.handleNumberChange} />
      <br/>
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