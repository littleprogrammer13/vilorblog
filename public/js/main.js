async function carregarPosts() {
  const res = await fetch('/posts');
  const posts = await res.json();
  const container = document.getElementById('posts');

  container.innerHTML = posts.length
    ? posts.map(p => `
      <div class="post">
        <h2>${p.title}</h2>
        <p>${p.content}</p>
        <small>${new Date(p.date).toLocaleString()}</small>
      </div>
    `).join('')
    : '<p>Nenhum post disponível.</p>';
}

carregarPosts();
