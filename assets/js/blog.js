const blogPosts = JSON.parse(localStorage.getItem('Blogs')) || [];

const createBlogModal = document.querySelector("#createPostModal");
const postTitle = document.querySelector("#postTitle");
const postCategory = document.querySelector("#postCategory");
const postImage = document.querySelector("#postImage");
const postContent = document.querySelector("#postContent");
const postLocation = document.querySelector("#postLocation");
const submit = document.querySelector("#submit-post");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  blogPosts.unshift({
    id: blogPosts.length + 1,
    image: postImage.value,
    category: postCategory.value,
    content: postContent.value,
    title: postTitle.value,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    location: postLocation.value,
  });

  localStorage.setItem("Blogs", JSON.stringify(blogPosts));
  renderBlogs();

  const modal =
    bootstrap.Modal.getInstance(createBlogModal) ||
    bootstrap.Modal.getOrCreateInstance(createBlogModal);

  modal.hide();
});

// Main blog rendering function
const blogSection = document.querySelector("#blog-posts");

const renderBlogs = () => {
  blogSection.innerHTML = ""; // Clear previous content

  const row = document.createElement("div");
  row.className = "row";

  blogPosts.forEach((post) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4 mb-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${post.image}" class="card-img-top" alt="Blog Image" style="object-fit: cover; height: 200px;">
        <div class="card-body">
          <p class="text-muted mb-1">${post.category}</p>
          <a href="blog-details.html?id=${post.id}" class="card-title blog-title fw-bold text-decoration-none" style="color: #007bff;">${post.title}</a>
          <p class="card-text"><small class="text-muted">${post.date}</small></p>
        </div>
      </div>
    `;

    const titleLink = col.querySelector(".blog-title");
    titleLink.addEventListener("click", () => {
      localStorage.setItem("CurrentId", post.id);
    });

    row.appendChild(col);
  });

  blogSection.appendChild(row); // Add the full row to the section
};

renderBlogs();
