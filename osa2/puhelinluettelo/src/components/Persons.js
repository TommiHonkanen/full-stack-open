const Persons = (props) => {
    return (
        <div>
            {props.peopleToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
        
    )
    
}

export default Persons