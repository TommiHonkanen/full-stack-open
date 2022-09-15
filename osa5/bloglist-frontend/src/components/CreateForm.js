import { useState } from "react"
import PropTypes from "prop-types"

const CreateForm = ({ createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const handleCreation = async (event) => {
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            url: url
        }
        createBlog(blog)
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return (<div>
        <h2>Create a new blog</h2>
        <form onSubmit={handleCreation}>
        title: <input type="text" name="title" value={title} onChange={handleTitleChange} /><br/>
        author: <input type="text" name="author" value={author} onChange={handleAuthorChange} /><br/>
        url: <input type="text" name="title" value={url} onChange={handleUrlChange} /><br/>
            <button type="submit">create</button>
        </form>
    </div>)
}

CreateForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default CreateForm
