import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification.js"
import ErrorNotification from "./components/ErrorNotification.js"
import LoginForm from "./components/Login.js"
import Togglable from "./components/Togglable.js"
import CreateForm from "./components/CreateForm"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
            setSuccessMessage(`Welcome back ${user.name}!`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000)
        } catch (exception) {
            setErrorMessage("wrong username or password")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    const incrementLikes = id => {
        const blog = blogs.find(b => b.id === id)
        const changedBlog = { ...blog, likes: blog.likes + 1 }

        if (blog.user !== undefined) {
            changedBlog.user = blog.user.id
        }

        blogService
            .update(id, changedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...returnedBlog, user: blog.user }))
            })
            .catch(() => {
                setErrorMessage(
                    `Blog '${blog.title}' was already removed from the server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
                setBlogs(blogs.filter(b => b.id !== id))
            })
    }

    const addBlog = async (blogObject) => {
        try {
            await blogService.create(blogObject)
            blogService.getAll().then(blogs =>
                setBlogs( blogs )
            )
            createFormRef.current.toggleVisibility()
            setSuccessMessage(`A new blog ${blogObject.title} added`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000)
        } catch (exception) {
            setErrorMessage("Blog creation failed")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    const removeBlog = async (id) => {
        try {
            const blog = blogs.find(b => b.id === id)
            if (!window.confirm(`Remove blog ${blog.title}?`)) {
                return
            }
            await blogService.remove(id)
            blogService.getAll().then(blogs =>
                setBlogs( blogs )
            )
            setSuccessMessage("Blog successfully removed")
            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000)
        } catch (exception) {
            setErrorMessage("Blog deletion failed")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    const logOut = () => {
        window.localStorage.removeItem("loggedBlogappUser")
        setUser(null)
        setUsername("")
        setPassword("")
        setSuccessMessage("Logged out successfully")
        setTimeout(() => {
            setSuccessMessage(null)
        }, 3000)
    }

    const blogForm = () => {
        return (<div>
            {user.name} logged in <button onClick={logOut}>log out</button><br/><br/>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} incrementLikes={() => incrementLikes(blog.id)} remove={() => removeBlog(blog.id)}/>
            )}
        </div>
        )
    }

    const loginForm = () => {
        return(
            <Togglable buttonLabel='login'>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />
            </Togglable>
        )
    }

    const createFormRef = useRef()

    const createForm = () => {
        return (
            <Togglable buttonLabel="new blog" ref={createFormRef}>
                <CreateForm createBlog={addBlog} />
            </Togglable>
        )
    }


    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={successMessage} />
            <ErrorNotification message={errorMessage} />

            { user === null && loginForm() }
            { user !== null && blogForm() }
            { user !== null && createForm() }

        </div>
    )
}

export default App
