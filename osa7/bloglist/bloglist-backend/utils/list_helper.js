const { groupBy, maxBy, sum } = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => (sum += blog.likes));
  return sum;
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const maxLikes = Math.max(...likes);
  const array = blogs.filter((blog) => blog.likes === maxLikes);
  return array.length === 0 ? 0 : array[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const sorted = groupBy(blogs, "author");
  const amounts = Object.entries(sorted).map((arr) => [arr[0], arr[1].length]);
  const author = maxBy(amounts, (person) => person[1]);
  return {
    author: author[0],
    blogs: author[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const sorted = groupBy(blogs, "author");
  const amounts = Object.entries(sorted).map((arr) => [
    arr[0],
    sum(arr[1].map((obj) => obj.likes)),
  ]);
  const author = maxBy(amounts, (person) => person[1]);
  return {
    author: author[0],
    likes: author[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
