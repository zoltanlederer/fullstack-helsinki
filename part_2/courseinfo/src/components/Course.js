import React from "react";

const Header = ({courseName}) => {
    return (
      <h2>{courseName}</h2>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((result, current) => {
        return result + current.exercises
    }, 0)

    return(
      <p><strong>Total of {total} exercises</strong></p>
    ) 
  }
  
const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
const Content = ({parts}) => {
    return (
        <>
        {parts.map(part => (
            <Part key={part.id} part={part} />
        ))}
        </>
    )
}

const Course = ({courseName, parts}) => {
    return (
        <div>            
            <Header courseName={courseName} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course;