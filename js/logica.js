const d=document;
$template = d.getElementById("contenedor").content,
$padre=d.querySelector(".row");
$fragment = d.createDocumentFragment();
console.log($template)



 
let $clone = d.importNode($template, true);
$fragment.appendChild($clone);

