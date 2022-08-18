const Total = (props) => {
    // console.log(props)
    return (
        <div>
            <p><strong>total of {props.parts.map(part => part.exercises).reduce((i, j) => i + j)} exercises</strong></p>
        </div>
    )
}

export default Total