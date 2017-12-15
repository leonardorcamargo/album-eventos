var patchBase = "";

function onClick(element) {
    ampliaImagem(element);
    var modal = document.querySelector("#modal01");
    modal.style.display = "block";
    modal.addEventListener("click",function(event){
        if (event.target.getAttribute("id") == "modal01"){
            fecharImagem();
        }
    });
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
    var img = document.querySelector("#idImagem");
    img.src = patchBase+"/view/"+imagem.id;
    img.name = imagem.id; 
}

function localizaProximaImagem(imagemAtual){
    var imagens = listaImagens();

    if (imagemAtual == null){
        return imagens[0];
    }
    else{
        for (let index = 0; index < imagens.length; index++) {
            if (imagens[index].id === imagemAtual.name){
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
            if (imagens[index].id == imagemAtual.name){
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

function criaMiniaturaImagem(nomeImagem){
    var card = document.createElement("div");
    card.classList.add("w3-third");
    card.classList.add("w3-card");
    var img = document.createElement("img");
    img.setAttribute("src",patchBase+"/min/"+nomeImagem);
    img.classList.add("photos");
    img.setAttribute("id",nomeImagem);
    img.style.width = "95%";
    img.style.height= "auto";
    img.setAttribute("onClick","onClick(this)");
    card.appendChild(img);
    return card;
}

function clickImagem(img){
    var pos = pegaPosicao(img);
    if (pos = 0){
        imagemAnterior();
    }else if (pos = 1){
        proximaImagem();
    }else{
        fecharImagem();
    }
}

function pegaPosicao(obj){
    var posicaoX = event.clientX - obj.getBoundingClientRect().left;
    var widthImagem = obj.getBoundingClientRect().width;
    if ((posicaoX > widthImagem) || (posicaoX < 0)){
        return -1;
    }
    if (widthImagem / 2 > posicaoX){
        return 0;
    } else {
        return 1;
    };
}

function navegacaoImagem(){
    var tecla = event.keyCode;
    
    if (document.querySelector("#modal01").style.display == "block"){
        if(tecla == 37) {
            //pressionado seta esquerda
            imagemAnterior();
        } else if(tecla == 39) {
            //pressionado seta direita
            proximaImagem();
        } else if (tecla == 27) {
            //pressionado ESC
            fecharImagem();
        }
    }
}

montaGridImagens("http://54.233.167.116/album-wsac/eventos/2017-12-09");