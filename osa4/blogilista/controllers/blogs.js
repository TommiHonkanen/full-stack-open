const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (_request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" })
	}
	const user = request.user

	if (body.title === undefined || body.author === undefined) {
		return response.status(400).json({ error: "title or author missing" })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" })
	}
	const user = request.user
	const userid = user.id

	const blog = await Blog.findById(request.params.id)

	if (blog.user === undefined) {
		return response.status(401).json({ error: "You are not authorized to delete this blog" })
	}

	if (blog.user.toString() === userid.toString()) {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} else {
		return response.status(401).json({ error: "You are not authorized to delete this blog" })
	}

	
})

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(newBlog)
})

module.exports = blogsRouter

