import { useState } from "react"

const Blog = ({ blog, incrementLikes, remove }) => {
    const [showEverything, setShowEverything] = useState(false)

    if (showEverything) {
        if (blog.user === undefined) {
            return(
                <div className="blog">
                    {blog.title} {blog.author} <button onClick={() => setShowEverything(false)}>hide</button> <br/>
                    <span>{blog.url}</span> <br/>
                    <span>likes {blog.likes}</span> <button id="likebutton" onClick={incrementLikes}>like</button><br/>
                </div>
            )
        } else {
            return(
                <div className="blog">
                    {blog.title} {blog.author} <button onClick={() => setShowEverything(false)}>hide</button> <br/>
                    <span>{blog.url}</span> <br/>
                    <span>likes {blog.likes}</span> <button id="likebutton" onClick={incrementLikes}>like</button><br/>
                    {blog.user.name} <br/>
                    <button id="removebutton" onClick={remove}>remove</button>
                </div>
            )
        }

    } else {
        return(
            <div className="blog">
                {blog.title} {blog.author} <button onClick={() => setShowEverything(true)}>view</button>
            </div>
        )
    }
}

export default Blog