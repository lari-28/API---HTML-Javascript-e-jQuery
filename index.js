// Função para exibir o loading
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Função para esconder o loading
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Função para carregar todos os posts (usando AJAX com jQuery)
function loadPosts() {
    showLoading();
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
        success: function(posts) {
            let postContainer = document.getElementById('posts');
            postContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = `
                    <div class="post">
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                        <button class="loadComments" data-post-id="${post.id}">Carregar Comentários</button>
                        <div class="comments" id="comments-${post.id}"></div>
                    </div>
                `;
                postContainer.innerHTML += postElement;
            });
            hideLoading();
        },
        error: function() {
            console.log("Erro ao carregar os posts.");
            hideLoading();
        }
    });
}

// Função para carregar comentários de um post específico (usando FETCH)
function loadComments(postId) {
    showLoading();
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => {
            const commentSection = document.getElementById(`comments-${postId}`);
            commentSection.innerHTML = '';
            comments.forEach(comment => {
                const commentElement = `
                    <div class="comment">
                        <h4>${comment.email}</h4>
                        <p>${comment.body}</p>
                    </div>
                `;
                commentSection.innerHTML += commentElement;
            });
            hideLoading();
        })
        .catch(() => {
            console.log("Erro ao carregar os comentários.");
            hideLoading();
        });
}

// Função para carregar todos os comentários de todos os posts
function loadAllComments() {
    showLoading();
    fetch("https://jsonplaceholder.typicode.com/comments")
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => {
                const commentSection = document.getElementById(`comments-${comment.postId}`);
                if (commentSection) {
                    const commentElement = `
                        <div class="comment">
                            <h4>${comment.email}</h4>
                            <p>${comment.body}</p>
                        </div>
                    `;
                    commentSection.innerHTML += commentElement;
                }
            });
            hideLoading();
        })
        .catch(() => {
            console.log("Erro ao carregar todos os comentários.");
            hideLoading();
        });
}

// Event listener para carregar posts ao abrir a página
window.addEventListener('load', loadPosts);

// Event listener para carregar comentários ao clicar no botão de cada post
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('loadComments')) {
        const postId = event.target.getAttribute('data-post-id');
        loadComments(postId);
    }
});

// Event listener para carregar todos os comentários de uma vez
document.getElementById('loadAllComments').addEventListener('click', loadAllComments);