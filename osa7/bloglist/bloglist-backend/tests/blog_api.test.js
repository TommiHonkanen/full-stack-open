const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);

  await api.post("/api/users").send({
    name: "test test",
    username: "test",
    password: "12345",
  });
});

describe("retrieving blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("all blogs have a property called id", async () => {
    const response = await api.get("/api/blogs");

    for (const blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });
});

describe("adding a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "test",
      author: "Walter White",
      url: "http://ggfdfddddddddgh.dfsg",
      likes: 62,
    };

    const user = await api.post("/api/login").send({
      username: "test",
      password: "12345",
    });

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + user.body.token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("test");
  });

  test("likes are 0 if no value is given", async () => {
    const newBlog = {
      title: "test 2",
      author: "Walter White",
      url: "http://ggfdfddddddddgh.dfsg",
    };

    const user = await api.post("/api/login").send({
      username: "test",
      password: "12345",
    });

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + user.body.token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const blog = response.body.filter((blog) => blog.title === "test 2");

    expect(blog[0].likes).toBe(0);
  });

  test("a blog without title or author is not added", async () => {
    const newBlog = {
      likes: 62,
    };

    const user = await api.post("/api/login").send({
      username: "test",
      password: "12345",
    });

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + user.body.token)
      .send(newBlog)
      .expect(400);

    const blogs = await Blog.find({});
    const blogsAtEnd = blogs.map((blog) => blog.toJSON());

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test("fails with status code 401 if token is not sent", async () => {
    const newBlog = {
      title: "test 2",
      author: "Walter White",
      url: "http://ggfdfddddddddgh.dfsg",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogs = await Blog.find({});
    const blogsAtEnd = blogs.map((blog) => blog.toJSON());

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const user = await api.post("/api/login").send({
      username: "test",
      password: "12345",
    });

    const blog = {
      title: "for delete test",
      author: "keys",
      url: "ggggasdg.html",
      likes: 62222,
      user: "631df4e00088c2bd841cfa2e",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + user.body.token)
      .send(blog);

    const blogs = await Blog.find({});
    const blogsAtStart = blogs.map((blog) => blog.toJSON());
    const blogToDelete = blogsAtStart.filter(
      (blog) => blog.title === "for delete test"
    );

    await api
      .delete(`/api/blogs/${blogToDelete[0].id}`)
      .set("Authorization", "bearer " + user.body.token)
      .expect(204);

    const blogs2 = await Blog.find({});
    const blogsAtEnd = blogs2.map((blog) => blog.toJSON());

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain("for delete test");
  });

  test("fails with status code 401 if trying to delete someone else's blog", async () => {
    const user = await api.post("/api/login").send({
      username: "test",
      password: "12345",
    });

    const blogs = await Blog.find({});
    const blogsAtStart = blogs.map((blog) => blog.toJSON());
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", "bearer " + user.body.token)
      .expect(401);

    const blogs2 = await Blog.find({});
    const blogsAtEnd = blogs2.map((blog) => blog.toJSON());

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).toContain(blogToDelete.title);
  });
});

describe("editing a blog", () => {
  test("correctly changes the amount of likes", async () => {
    const newBlog = {
      id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 5,
    };
    await api
      .put("/api/blogs/5a422bc61b54a676234d17fc")
      .send(newBlog)
      .expect(200);

    const response = await api.get("/api/blogs");

    const blog = response.body.filter((blog) => blog.title === "Type wars");

    expect(blog[0].likes).toBe(5);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
