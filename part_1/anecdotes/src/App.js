import React, { useState } from 'react'

const Button = ({handleOnClick, text}) => {
  return (
    <button onClick={handleOnClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoint] = useState(Array(7).fill(0));

  const handleRandom = () => {
    const randomIndex = Math.floor((Math.random() * 7));
    setSelected(randomIndex);
  }

  const handelVotes = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoint(copy)
  }

  const highestPointIndex = points.indexOf(Math.max(...points));
  const highestPoint = Math.max(...points);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
        <br />
        <strong>Has {points[selected]} votes.</strong>
      </p>
      <Button handleOnClick={handelVotes} text='Vote' />
      <Button handleOnClick={handleRandom} text='Next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[highestPointIndex]}
        <br />
        <strong>Has {highestPoint} votes.</strong>
      </p>
    </div>
  )
}

export default App