const blogPostsArray = JSON.parse(localStorage.getItem('Blogs')) || [
  {
    id: 4,
    image: "https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg",
    category: "Politics",
    title: "Dolorum optio tempore voluptas dignissimos",
    readingTime: "Jan 1, 2022",
    date: "Jan 1, 2022",
    location : "jordan",
    content:
      "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/5742850/pexels-photo-5742850.jpeg",
    category: "Sports",
    title: "Nisi magni odit consequatur autem nulla dolorem",
    readingTime: "Jan 1, 2022",
    date: "Jun 5, 2022",
    location : "jordan",
    content:
      "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ",
  },

  {
    id: 2,
    image: "https://images.pexels.com/photos/5742850/pexels-photo-5742850.jpeg",
    category: "Sports",
    title: "Nisi magni odit consequatur autem nulla dolorem",
    readingTime: "Jan 1, 2022",
    date: "Jun 5, 2022",
    content:
      "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ",
  },
  {
    id: 1,
    image: "https://images.pexels.com/photos/5742850/pexels-photo-5742850.jpeg",
    category: "Sports",
    title: "Nisi magni odit consequatur autem nulla dolorem",
    date: "Jun 5, 2022",
    location : "jordan",
    content:
      "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ",
  },
];
if (blogPostsArray) {
  localStorage.setItem("Blogs", JSON.stringify(blogPostsArray));
}
