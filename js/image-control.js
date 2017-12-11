var patchBase = "";

function onClick(element) {
    ampliaImagem(element);
    document.querySelector("#modal01").style.display = "block";
}

function proximaImagem(){
    var imagem = localizaProximaImagem(imagemAtual());
    
    if (imagem === null) {
        fecharImagem();
    }
    else{
        ampliaImagem(imagem);
    }    
}

function imagemAnterior(){
    var imagem = localizaImagemAnterior(imagemAtual());
    if (imagem === null){
        fecharImagem();
    }
    else{
        ampliaImagem(imagem);
    }
}

function listaImagens(){
    var imagens = document.querySelectorAll(".photos");
    return imagens;
}

function ampliaImagem(imagem){
    document.querySelector("#idImagem").src = patchBase+"/"+imagem.id;
}

function localizaProximaImagem(imagemAtual){
    var imagens = listaImagens();

    if (imagemAtual == null){
        return imagens[0];
    }
    else{
        for (let index = 0; index < imagens.length; index++) {
            if (imagens[index].src === imagemAtual.src){
                if (imagens[index + 1] === undefined){return null}else{return imagens[index + 1]}
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
                if (imagens[index - 1] === undefined){return null;}else{return imagens[index - 1];}
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

function montaGridImagens(patch){
    patchBase = patch;
    w3.getHttpObject(patchBase+"/imagens.json", function(imagens){
        criarEstruturaGrid(imagens);
    });
}

function criarEstruturaGrid(imagens){    
    var gridImagens = document.querySelector("#idGridImagens");    
    imagens.forEach(imagem => {
       gridImagens.appendChild(criaMiniaturaImagem(imagem));
    });
}

function criaLinha(){
    var divLinha = document.createElement("div");
    divLinha.classList.add("w3-third");
    return divLinha;
}

function criaMiniaturaImagem(caminhoImagem){
    var img = document.createElement("img");
    img.setAttribute("src",patchBase+"/miniaturas/"+caminhoImagem);
    img.classList.add("w3-third");    
    img.classList.add("photos");
    img.setAttribute("id",caminhoImagem);
    img.setAttribute("onClick","onClick(this)");
    return img;
}

montaGridImagens("img/2017-12-09");