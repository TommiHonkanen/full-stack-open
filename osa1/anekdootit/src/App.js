import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const DailyAnecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.points} votes</p>
    </div>
  )
}

const TopAnecdote = (props) => {
  if (props.points === 0) {
    return (
      <div>
        <p>No votes yet</p>
      </div>
    )
  }

  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.points} votes</p>
    </div>
  )
}

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

  const selectRandom = () => {
    console.log(selected)
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const addVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DailyAnecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={addVote} text="vote" />
      <Button handleClick={selectRandom} text="next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <TopAnecdote anecdote={anecdotes[points.indexOf(Math.max(...points))]} points={Math.max(...points)}/>
    </div>
  )
}

export default App