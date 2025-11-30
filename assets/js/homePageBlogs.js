document.addEventListener("DOMContentLoaded", function () {
  let blogPosts = JSON.parse(localStorage.getItem("Blogs")) || [];
  const blogContainer = document.getElementById("blogContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const paginationContainer = document.querySelector(".pagination-container");

  let currentIndex = 0;
  const postsPerPage = 3;
  let autoTransition;

  // Render blog posts
  function renderPosts(startIndex) {
    blogContainer.classList.add("fade-out");
    setTimeout(() => {
      blogContainer.innerHTML = "";

      const postsToRender = blogPosts.slice(startIndex, startIndex + postsPerPage);

      postsToRender.forEach((post , ind) => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-lg-4 mb-4";

        col.innerHTML = `
  <div class="card h-100 shadow-sm">
    <img src="${post.image}" class="card-img-top" alt="Blog Image">
    <div class="card-body">
      <p class="text-muted mb-1">${post.category}</p>
      <a href="blog-details.html?id=${post.id}" class="card-title blog-title">${post.title}</a>
      <p class="card-text"><small class="text-muted">${post.date}</small></p>
    </div>
  </div>
`;
        col.addEventListener('click',()=>{
          localStorage.setItem('CurrentId' , post.id)
      })
        blogContainer.appendChild(col);
      });

      blogContainer.classList.remove("fade-out");
    }, 500);
  }

  // Render pagination circles dynamically
  function renderPagination() {
    paginationContainer.innerHTML = "";
    const pageCount = Math.ceil(blogPosts.length / postsPerPage);

    // Previous page button (static with angle bracket)
    const prevBtn = document.createElement("button");
    prevBtn.className = "btn btn-outline-primary me-2";
    prevBtn.innerHTML = '&lt;';
    prevBtn.addEventListener("click", () => {
      if (currentIndex - postsPerPage >= 0) {
        currentIndex -= postsPerPage;
        renderPosts(currentIndex);
        renderPagination();
      }
    });
    paginationContainer.appendChild(prevBtn);

    // Page numbers (circles)
    for (let i = 0; i < pageCount; i++) {
      const pageButton = document.createElement("button");
      pageButton.className = "page-circle btn btn-outline-primary";
      pageButton.textContent = i + 1;
      pageButton.setAttribute("data-index", i);

      if (i === currentIndex / postsPerPage) {
        pageButton.classList.add("active");
      }

      pageButton.addEventListener("click", () => {
        currentIndex = i * postsPerPage;
        renderPosts(currentIndex);
        renderPagination();
        clearInterval(autoTransition); // Stop automatic transition
        startAutoTransition(); // Restart automatic transition after manual page change
      });

      paginationContainer.appendChild(pageButton);
    }

    // Next page button (static with angle bracket)
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-outline-primary ms-2";
    nextBtn.innerHTML = '&gt;';
    nextBtn.addEventListener("click", () => {
      const nextIndex = currentIndex + postsPerPage;
      if (nextIndex < blogPosts.length) {
        currentIndex += postsPerPage;
        renderPosts(currentIndex);
        renderPagination();
      }
    });
    paginationContainer.appendChild(nextBtn);
  }

  // Function to start automatic page transition
  function startAutoTransition() {
    autoTransition = setInterval(() => {
      const nextIndex = currentIndex + postsPerPage;
      if (nextIndex < blogPosts.length) {
        currentIndex += postsPerPage;
      } else {
        currentIndex = 0; // Restart from the beginning if reached the last page
      }
      renderPosts(currentIndex);
      renderPagination();
    }, 3000); // Transition every 3 seconds
  }

  // Initial rendering
  renderPosts(currentIndex);
  renderPagination();
  startAutoTransition();

  // Smooth transition styling
  const style = document.createElement("style");
  style.innerHTML = `
  .fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  .active {
    background-color: #00aaff !important;
    color: white;
  }
  .page-circle {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: 0 5px;
  }
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .pagination-container button {
    margin: 0 10px;
  }
  .pagination-container .btn-outline-primary {
    padding: 10px;
  }
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  .card-title.blog-title {
    display: block;
    font-weight: 600;
    color: #333;
    margin: 8px 0;
    text-decoration: none;
  }
  .card-title.blog-title:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

  document.head.appendChild(style);
});
