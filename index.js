function mostrarCarregando() {
    var carregando = document.getElementById('loading');
    carregando.style.display = 'block';
}

function esconderCarregando() {
    var carregando = document.getElementById('loading');
    carregando.style.display = 'none';
}

function mostrarErro(mensagem) {
    var erroDiv = document.getElementById('error');
    erroDiv.innerHTML = mensagem;
    erroDiv.style.display = 'block';
}

function limparErro() {
    var erroDiv = document.getElementById('error');
    erroDiv.innerHTML = '';
    erroDiv.style.display = 'none';
}

function carregarPosts() {
    mostrarCarregando();
    limparErro();
    
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
        success: function(posts) {
            var containerPosts = document.getElementById('posts');
            containerPosts.innerHTML = '';
            for (var i = 0; i < posts.length; i++) {
                var post = posts[i];
                containerPosts.innerHTML += '<div class="post">' +
                    '<h2>' + post.title + '</h2>' +
                    '<p><strong>ID:</strong> ' + post.id + '</p>' +
                    '<p><strong>Usuário ID:</strong> ' + post.userId + '</p>' +
                    '<p>' + post.body + '</p>' +
                    '<button class="loadComments" data-post-id="' + post.id + '">Carregar Comentários</button>' +
                    '<div class="comments" id="comments-' + post.id + '" style="display:none;"></div>' +
                    '</div>';
            }
            esconderCarregando();
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
            mostrarErro("Erro ao carregar os posts.");
            esconderCarregando();
        }
    });
}

function carregarComentarios(postId) {
    var secaoComentarios = document.getElementById('comments-' + postId);
    
    if (secaoComentarios.style.display === 'block') {
        secaoComentarios.style.display = 'none';
        secaoComentarios.innerHTML = '';
        return;
    }

    mostrarCarregando();
    limparErro();
    
    fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postId)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erro na rede');
            }
            return response.json();
        })
        .then(function(comentarios) {
            secaoComentarios.innerHTML = '';
            for (var i = 0; i < comentarios.length; i++) {
                var comentario = comentarios[i];
                secaoComentarios.innerHTML += '<div class="comment">' +
                    '<h4>' + comentario.email + '</h4>' +
                    '<p>' + comentario.body + '</p>' +
                    '</div>';
            }
            secaoComentarios.style.display = 'block';
            esconderCarregando();
        })
        .catch(function() {
            mostrarErro("Erro ao carregar os comentários.");
            esconderCarregando();
        });
}

function carregarTodosComentarios() {
    var todasSecoesComentarios = document.querySelectorAll('.comments');
    for (var i = 0; i < todasSecoesComentarios.length; i++) {
        var secao = todasSecoesComentarios[i];
        secao.style.display = 'none';
        secao.innerHTML = '';
    }

    mostrarCarregando();
    limparErro();
    
    fetch("https://jsonplaceholder.typicode.com/comments")
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erro na rede');
            }
            return response.json();
        })
        .then(function(comentarios) {
            for (var i = 0; i < comentarios.length; i++) {
                var comentario = comentarios[i];
                var secaoComentarios = document.getElementById('comments-' + comentario.postId);
                if (secaoComentarios) {
                    secaoComentarios.innerHTML += '<div class="comment">' +
                        '<h4>' + comentario.email + '</h4>' +
                        '<p>' + comentario.body + '</p>' +
                        '</div>';
                    secaoComentarios.style.display = 'block';
                }
            }
            esconderCarregando();
        })
        .catch(function() {
            mostrarErro("Erro ao carregar todos os comentários.");
            esconderCarregando();
        });
}

window.onload = carregarPosts;

document.onclick = function(event) {
    if (event.target.classList.contains('loadComments')) {
        var postId = event.target.getAttribute('data-post-id');
        carregarComentarios(postId);
    }
};

document.getElementById('loadAllComments').onclick = carregarTodosComentarios;