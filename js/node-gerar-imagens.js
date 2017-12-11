var fs = require('fs');
var domain = require('domain').create();

fs.readdir('../img',function(error,files){
    files.forEach(pasta => {
        fs.readdir('../img/'+pasta,function(error,files){
            salvarJSON(pasta,JSON.stringify(files));
        });
    });
});

domain.on("error",function(erros){
   console.log(erros);
});

function salvarJSON(pasta,lista){
    fs.writeFile("../img/"+pasta+"/imagens.json", lista, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}