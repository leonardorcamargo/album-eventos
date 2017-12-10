// Modal Image Gallery
function onClick(element) {
    carregaImagem(element);
    document.querySelector("#modal01").style.display = "block";
}

function proximaImagem(){
    var imagem = localizaProximaImagem(imagemAtual());    
    carregaImagem(imagem);
}

function imagemAnterior(){
    var imagem = localizaImagemAnterior(imagemAtual());
    carregaImagem(imagem);
}

function listaImagens(){
    var imagens = document.querySelectorAll(".photos");
    return imagens;
}

function carregaImagem(imagem){
    document.querySelector("#idImagem").src = imagem.src;
}

function localizaProximaImagem(imagemAtual){
    var imagens = listaImagens();

    if (imagemAtual == null){
        return imagens[0];
    }
    else{
        for (let index = 0; index < imagens.length; index++) {
            if (imagens[index].src === imagemAtual.src){
                return imagens[index + 1];
            }
        }
    }
    return null;
}

function localizaImagemAnterior(imagemAtual){
    var imagens = listaImagens();

    if (imagemAtual == null){
        return imagens[0];
    }
    else{
        for (let index = 0; index < imagens.length; index++) {
            if (imagens[index].src == imagemAtual.src){
                return imagens[index - 1];
            }            
        }
    }
    return null;
}

function imagemAtual(){
    return document.querySelector("#idImagem");
}

function fecharImagem(){
    document.querySelector("#modal01").style.display="none";
}