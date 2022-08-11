const Header = (props) => {
  return (
    <div>
      <h1>
        {props.title}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.array[0]} />
      <Part part={props.array[1]} />
      <Part part={props.array[2]} />
    </div>
  )
}

const Part = (props) => {
  return ( 
  <div>
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.array[0].exercises + props.array[1].exercises + props.array[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header title={course} />
      <Content array={parts} />
      <Total array={parts} />
    </div>
  )
}

export default App