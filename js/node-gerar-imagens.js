var fs = require('fs');
var domain = require('domain').create();

fs.readdir('../img/2017-12-09',function(error,files){
    salvarJSON(JSON.stringify(files));
});

domain.on("error",function(erros){
   console.log(erros);
});

function salvarJSON(lista){
    fs.writeFile("../img/2017-12-09/imagens.json", lista, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}