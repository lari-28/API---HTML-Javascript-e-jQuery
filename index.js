function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function loadComments() {
    showLoading();
    fetch("https://jsonplaceholder.typicode.com/comments")
    .then((retorno) => retorno.json())
    .then((json) => {
        hideLoading();
        let postsHtml = '';
        for (let i = 0; i < json.length; i++) {
            postsHtml +=
            '<div class="commentId">' +
                '<h2>Comment ID: ' + json[i].id + '</h2>' +
                '<h3>Email: ' + json[i].email + '</h3>' +
                '<h4>Name: ' + json[i].name + '</h4>' +
                '<p>Body: ' + json[i].body + '</p>' +
            '</div>';
        }
        document.getElementById('posts').innerHTML = postsHtml;
    });
}

document.getElementById('loadAllComments').addEventListener('click', loadComments);