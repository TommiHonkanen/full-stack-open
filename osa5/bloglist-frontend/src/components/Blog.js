import { useState } from "react"

const Blog = ({ blog, incrementLikes, remove }) => {
    const [showEverything, setShowEverything] = useState(false)

    if (showEverything) {
        if (blog.user === undefined) {
            return(
                <div>
                    {blog.title} {blog.author} <button onClick={() => setShowEverything(false)}>hide</button> <br/>
                    {blog.url} <br/>
          likes {blog.likes} <button onClick={incrementLikes}>like</button><br/>
                </div>
            )
        } else {
            return(
                <div>
                    {blog.title} {blog.author} <button onClick={() => setShowEverything(false)}>hide</button> <br/>
                    {blog.url} <br/>
          likes {blog.likes} <button onClick={incrementLikes}>like</button><br/>
                    {blog.user.name} <br/>
                    <button onClick={remove}>remove</button>
                </div>
            )
        }

    } else {
        return(
            <div>
                {blog.title} {blog.author} <button onClick={() => setShowEverything(true)}>view</button>
            </div>
        )
    }
}

export default Blog