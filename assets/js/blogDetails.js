// ===== Fetch and Render Blog =====
const blogId = localStorage.getItem('CurrentId');
const blogs = JSON.parse(localStorage.getItem('Blogs')) || [];
const currentBlog = blogs.find(blog => blog.id == blogId);

if (currentBlog) {
  // Render main content
  document.getElementById('blog-title').textContent = currentBlog.title || '';
  document.getElementById('blog-image').src = currentBlog.image || '';
  document.getElementById('blog-content').innerHTML = `<p>${currentBlog.content || ''}</p>`;

  // Render sidebar data
  document.getElementById('starting-date').textContent = currentBlog.date || 'N/A';
  document.getElementById('end-date').textContent = currentBlog.date || 'N/A';
  document.getElementById('reading-time').textContent = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) || 'N/A';
  document.getElementById('location').textContent = currentBlog.location || 'N/A';
  document.getElementById('blog-category').textContent = currentBlog.category || 'N/A';

  // Communication Tools (optional)
  const toolsList = currentBlog.communicationTools || [];
  const toolsContainer = document.getElementById('communication-tools-list');
  if (toolsContainer) {
    toolsContainer.innerHTML = toolsList.map(tool => `<li>${tool}</li>`).join('');
  }

  // ===== Admin Controls =====
  if (localStorage.getItem('userRole') === 'admin') {
    const controls = document.getElementById('adminControls');
    if (controls) controls.classList.remove('d-none');

    // Fill modal when editing
    document.getElementById('editBtn').onclick = () => {
      document.getElementById('editTitle').value = currentBlog.title;
      document.getElementById('editContent').value = currentBlog.content;
      document.getElementById('editImage').value = currentBlog.image;

      new bootstrap.Modal('#editBlogModal').show();
    };

    // Save edits
    document.getElementById('saveEdit').onclick = () => {
      const title = document.getElementById('editTitle').value.trim();
      const content = document.getElementById('editContent').value.trim();
      const image = document.getElementById('editImage').value.trim();

      currentBlog.title = title;
      currentBlog.content = content;
      currentBlog.image = image;

      localStorage.setItem('Blogs', JSON.stringify(blogs));
      location.reload();
    };

    // Delete blog
    document.getElementById('deleteBtn').onclick = () => {
      if (confirm('Are you sure you want to delete this blog?')) {
        const updatedBlogs = blogs.filter(blog => blog.id != blogId);
        localStorage.setItem('Blogs', JSON.stringify(updatedBlogs));
        localStorage.removeItem('CurrentId');
        location.href = 'blog.html';
      }
    };
  }

} else {
  console.error('Blog post not found for the provided ID.');
}
