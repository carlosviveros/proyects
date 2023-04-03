const d=document;
$agregar=d.querySelector("#addCart");
$form=d.querySelector("#formulario")
$padreCart=d.querySelector("#divPadre")
$template = d.getElementById("contenedorCarrito").content,
$fragment = d.createDocumentFragment();
$sub=d.querySelector(".subtotal");
$nodoTotal=d.querySelector(".total")
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let count=d.querySelector(".count")
const servicioId = window.location.href.split('?')[1];
var producto = {};
console.log(servicioId)




const getAll = async () => {
    try {
      let res = await fetch("js/db.json"),
        json = await res.json();

     if (!res.ok) throw { status: res.status, statusText: res.statusText };


      json.products.forEach(el=>{
        if(el.id==servicioId){
          producto.id = el.id;
          producto.nombre = el.nombre;
          producto.precio=el.precio;
          producto.img=el.img;
          d.querySelector(".nombre").textContent = el.nombre;
          d.querySelector(".product-price").textContent = el.precio;
          //d.querySelector(".imgagenl").setAttribute("src", el.img)
        }    

     });
} catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(err)
  }
}

 
//Single-Product:
$form.addEventListener("submit", async e=>{

  e.preventDefault();

    const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id);

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === producto.id) {
          prod.cantidad++;
        }
      });
  }
  else{
    carrito.push({
      id: producto.id,
      imagen:producto.img,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
    saveLocal();
  }

  console.log(carrito)
});  

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};



pintarCarrito=()=>{
  carrito.forEach(element=>{
    $template.querySelector(".nombreCarrito").textContent = element.nombre;
    $template.querySelector(".price").textContent = element.precio;
    $template.querySelector("#imagenPersonal").setAttribute("src", element.imagen)

    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);

  })
  $padreCart.appendChild($fragment);
  
  const carritoLength = carrito.length;
  const subtotal = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  const total=subtotal*0.15;
  $sub.innerText=subtotal;
  $nodoTotal.innerText=total

  

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  count.innerText = JSON.parse(localStorage.getItem("carritoLength"));
 
}







// d.addEventListener("click", async e => {
//     if (e.target.matches(".enviar")) {
//     
//       $form.nombre.value = e.target.dataset.name;
//       $form.constelacion.value = e.target.dataset.constellation;
//       $form.id.value = e.target.dataset.id;
//    
d.addEventListener("DOMContentLoaded", getAll);
d.addEventListener("DOMContentLoaded", pintarCarrito);
