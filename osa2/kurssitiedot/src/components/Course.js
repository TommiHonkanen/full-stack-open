import Content from "./Content.js"
import Header from "./Header.js"
import Total from "./Total.js"

const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course 