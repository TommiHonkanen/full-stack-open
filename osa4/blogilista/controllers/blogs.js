const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (_request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body

	if (body.title === undefined || body.author === undefined) {
		return response.status(400).json({ error: "title or author missing" })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0
	})

	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
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

