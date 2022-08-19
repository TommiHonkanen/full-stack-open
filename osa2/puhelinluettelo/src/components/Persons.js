const Persons = (props) => {
    return (
        <div>
            {props.peopleToShow.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => props.delete(person.name)}>delete</button></p>)}
        </div>
        
    )
}

export default Persons