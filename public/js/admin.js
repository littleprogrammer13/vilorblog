async function carregarPosts() {
  const res = await fetch('/posts');
  const posts = await res.json();
  const container = document.getElementById('posts');

  container.innerHTML = posts.map(p => `
    <div class="post">
      <h3>${p.title}</h3>
      <p>${p.content}</p>
      <button onclick="excluirPost('${p.id}')">Excluir</button>
    </div>
  `).join('');
}

async function excluirPost(id) {
  await fetch('/posts/delete/' + id, { method: 'DELETE' });
  carregarPosts();
}

const form = document.getElementById('newPostForm');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch('/posts/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  form.reset();
  carregarPosts();
});

document.getElementById('logout').addEventListener('click', async () => {
  await fetch('/auth/logout');
  window.location.href = '/';
});

carregarPosts();
