import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils'
import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistics = ({good, neutral, bad}) => {
  const average = ((good*1) + (bad*-1)) / (good+bad+neutral)
  const positive = good/(neutral+bad+good) * 100
  return (
  <table>
      <tbody>
      <StatisticLine text="hyvä" amount={good} />
      <StatisticLine text="neutraali" amount={neutral} />
      <StatisticLine text="huono" amount={bad} />
      <StatisticLine text="yhteensä" amount={good+neutral+bad} />
      <StatisticLine text="average" amount={average} />
      <StatisticLine text="positiiviset" amount={positive} />
      </tbody>
  </table>
  )
}

const StatisticLine = (props) => {
  if(props.text === "positiiviset")
    return <tr><td>{props.text}</td> <td>{props.amount} %</td></tr>
  else
    return <tr><td>{props.text}</td> <td>{props.amount}</td></tr>
}

function App() {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>Anna palautetta!</h1>
      <Button handleClick={() => setGood(good + 1)} text="hyvä" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutraali" />
      <Button handleClick={() => setBad(bad + 1)} text="huono" />
      <h1>Palautteet:</h1>
      {(good > 0 | neutral > 0 | bad > 0)
      ? <Statistics good={good} neutral={neutral} bad={bad} />
      : <p>Ei vielä palautteita annettu.</p>}
      
    </div>
  )
}




export default App