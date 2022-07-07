import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
  const [biggestIndex, setBiggestIndex] = useState(0)

  const getRandom = () => Math.floor(Math.random() * 7)
  
  const newVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    //when we get a vote we also check if we need to update
    // the anecdote with most votes:
    if(copy[selected] > votes[biggestIndex])
      setBiggestIndex(selected)
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <PrintVotes amount={votes[selected]}/>
      <br/>
      <Button handleClick={newVote} text="vote"/>
      <Button handleClick={() => setSelected(getRandom)} text="Next anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[biggestIndex]}
    </div>
  )
}

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const PrintVotes = (props) => <p>has {props.amount} votes</p>



export default App