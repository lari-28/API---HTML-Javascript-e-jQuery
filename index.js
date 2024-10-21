

function loadComments(){
    fetch("https://jsonplaceholder.typicode.com/comments")
    .then((retorno) => retorno.json())
    .then((json) => {
        console.log(json);
        for (i = 0; i < json.length; i++) {
            var elemento = 
            '<div class="commentId">'+
                '<h2>Comment ID: '+ json[i].id+'</h2>'+
                '<h3>Email: '+ json[i].email +'</h3>'+
                '<h4>Name: '+ json[i].name +'</h4>'+
                '<p>Body: '+ json[i].body +'</p>'+
            '</div>'
            document.getElementById("informacoes").innerHTML += elemento;
        }
    });
}

/*
function fetch(){
    var resposta = await fetch("https://jsonplaceholder.typicode.com/photos");

    var resultado = await resposta.json();
    console.log(resultado);

    document.getElementById("albumId").value = resultado.albumId;
    document.getElementById("title").value = resultado.title;
    document.getElementById("id").value = resultado.id;
    document.getElementById("url").value = resultado.url;
    document.getElementById("thumbnailUrl").value = resultado.thumbnailUrl;

}*/