import Part from "./Part.js"

const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => {
            return <Part key={part.id} name={part.name} exercises={part.exercises} />
        })}
      </div>
    )
  }

  export default Content
  