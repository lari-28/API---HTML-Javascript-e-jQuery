function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = message;
    errorDiv.style.display = 'block';
}

function clearError() {
    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = '';
    errorDiv.style.display = 'none';
}

function loadPosts() {
    showLoading();
    clearError();
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
                        <h5><strong>ID:</strong> ${post.id} | Usuário ID:</strong> ${post.userId}</h5>
                        <p>${post.body}</p>
                        <button class="loadComments" data-post-id="${post.id}">Carregar Comentários</button>
                        <div class="comments" id="comments-${post.id}" style="display:none;"></div>
                    </div>
                `;
                postContainer.innerHTML += postElement;
            });
            hideLoading();
        },
        error: function() {
            showError("Erro ao carregar os posts.");
            hideLoading();
        }
    });
}

function loadComments(postId) {
    const commentSection = document.getElementById(`comments-${postId}`);
    if (commentSection.style.display === 'block') {
        commentSection.style.display = 'none';
        commentSection.innerHTML = ''; // Limpar comentários quando escondido
        return;
    }

    showLoading();
    clearError();
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(comments => {
            commentSection.innerHTML = ''; // Limpar comentários existentes antes de adicionar novos
            comments.forEach(comment => {
                const commentElement = `
                    <div class="comment">
                        <h4>${comment.email}</h4>
                        <p>${comment.body}</p>
                    </div>
                `;
                commentSection.innerHTML += commentElement;
            });
            commentSection.style.display = 'block'; // Mostrar comentários após carregar
            hideLoading();
        })
        .catch(() => {
            showError("Erro ao carregar os comentários.");
            hideLoading();
        });
}

function loadAllComments() {
    // Esconder todos os comentários antes de carregar
    const allCommentSections = document.querySelectorAll('.comments');
    allCommentSections.forEach(section => {
        section.style.display = 'none'; // Esconder todos os comentários
        section.innerHTML = ''; // Limpar todos os comentários
    });

    showLoading();
    clearError();
    fetch("https://jsonplaceholder.typicode.com/comments")
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
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
                    // Adicionar comentários às suas respectivas seções
                    commentSection.innerHTML += commentElement;
                    commentSection.style.display = 'block'; // Garantir que os comentários sejam visíveis
                }
            });
            hideLoading();
        })
        .catch(() => {
            showError("Erro ao carregar todos os comentários.");
            hideLoading();
        });
}

window.addEventListener('load', loadPosts);

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('loadComments')) {
        const postId = event.target.getAttribute('data-post-id');
        loadComments(postId);
    }
});

document.getElementById('loadAllComments').addEventListener('click', loadAllComments);