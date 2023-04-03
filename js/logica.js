const d=document;
$template = d.getElementById("contenedor").content,
$padre=d.querySelector("#padre");
$enlace=d.querySelector(".enviar");
$fragment = d.createDocumentFragment();
console.log(window.location.href)

const getAll = async () => {
    try {
      let res = await fetch("js/db.json"),
        json = await res.json();
        console.log(json);
      console.log(res);


      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      json.products.forEach(el=>{
        $template.querySelector(".nombre").textContent = el.nombre;
        $template.querySelector(".product-price").textContent = el.precio;
        $template.querySelector(".image").setAttribute("src", el.img)
        $template.querySelector(".id").value=el.id;
        $template.querySelector(".enviar").setAttribute("href","single-product-details.html?"+ $template.querySelector(".id").value);
       // $template.nombre.value = e.target.dataset.name;
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);

      });
      $padre.appendChild($fragment);



 

} catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(err)
  }
}



//Single-Product:






// d.addEventListener("click", async e => {
//     if (e.target.matches(".enviar")) {
//     
//       $form.nombre.value = e.target.dataset.name;
//       $form.constelacion.value = e.target.dataset.constellation;
//       $form.id.value = e.target.dataset.id;
//     }


d.addEventListener("DOMContentLoaded", getAll);
