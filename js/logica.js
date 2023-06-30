// Mostramos por consola una tabla de estudiantes para verificar todo OK
console.table(producto)


// Declaramos las variables que vamos a utilizar
let contenedorNombre = document.getElementById('nombre');
let contenedorPassword = document.getElementById('password');
let contenedorCard = document.getElementById('card')
let contenedorBusqueda = document.getElementById('busqueda')
let contenedorCarrito = document.getElementById('carrito')
let contenedorLogin = document.getElementById('login')
let contenedorNombreLogin = document.getElementById('nombreLogin')
let contenedorPasswordLogin = document.getElementById('passwordLogin')
let contenedorCarritoTotal = document.getElementById('carritoTotal')
// Por defecto llamamos a la funcion para siempre mostrar los estudiantes al comienzo
//renderizarAlumnos(students)
renderizarProductos(producto)



const carro = JSON.parse(localStorage.getItem('carro')) 
    renderizarProductosCarro(carro)

|| [];

// Esta funcion renderiza los productos por medio de un for of 

function renderizarProductos(lista){
    contenedorCard.innerHTML = '';
    for(const product of lista){
        contenedorCard.innerHTML += `
        <div class="card col-sm-2 m-3" style="width:18rem">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title" id="card-h5">${product.name}</h5>
            <h4 class="card-title">${product.price}</h4>
            <p class="card-text">${product.description}</p>
            <button id="${product.id}" class="btn btn-primary compra">Agregar al carrito</button>
            </div>
        </div>
        `
    }
    
}
// Esta funcion muestra los productos del carrito
function renderizarProductosCarro(lista){
    contenedorCarrito.innerHTML = '';
    for(const product of lista){
        contenedorCarrito.innerHTML += `
        <div class="card col-sm-2 m-3" style="width:18rem">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title" id="card-h5">${product.name}</h5>
            <h4 class="card-title">${product.price}</h4>
            <p class="card-text">${product.description}</p>
            <button id="${product.id}" class="btn btn-danger compra">Borrar</button>
            </div>
        </div>
        `
    }
    contenedorCarritoTotal.innerHTML= `Total: ${localStorage.getItem('total')}`    
}


// Esta funcion filtrara por nota maxima
function filtrarPorPrecio(price){
    const filtrados = producto.filter((item)=>item.price <= price);
    return filtrados;
}

// Esta funcion nos pide por medio de un prompt, que carguemos la nota maxima y hara los filtros
function filtrarPorPrecioButton(){
    contenedorCard.innerHTML=''
        notaMax = contenedorBusqueda.value //parseFloat(prompt('Ingresa el precio maximo'));
        if(isNaN(notaMax) || notaMax < 0){
            alert('Ingrese un numero valido')
        }else{
            const alumnosFiltrados = filtrarPorPrecio(notaMax);
            console.table(alumnosFiltrados);
            renderizarProductos(alumnosFiltrados)
        }
}

//Formulario

// Esta funcion borra los campos del formulario
function borrarCampos(){
    contenedorNombre.value=''
    contenedorPassword.value='';
}

// Esta funcion verifica que los inputs contengan almenos un valor para poder enviarse
// Una vez que termina se vacian y mandan un alert saludando al usuario

function enviarDatos(){
    if(contenedorPassword.value.trim() ==='' || contenedorNombre.value.trim() ===''){
        alert('Error cargue los campos')
    }else{
        alert(`Bienvenido ${contenedorNombre.value} su contraseña es ${contenedorPassword.value}`)
        let usuario ={
            nombre:contenedorNombre.value,
            password:contenedorPassword.value,
        }
        localStorage.setItem('usuario',JSON.stringify(usuario))
        borrarCampos()   // Borramos los campos una vez enviados
    }

}


// Funcion para encontrar al alumno por nombre, el nombre ingresado es pasado a mayuscula

function encontrarProductoNombre(){
    nombreIngresado = contenedorBusqueda.value;
    if(nombreIngresado!= ''  && nombreIngresado==String && nombreIngresado != Number){
        const encontrado = producto.filter((producto)=> producto.name.toUpperCase().includes(nombreIngresado.toUpperCase()))
        if(encontrado){
            renderizarProductos(encontrado)
            //console.table(encontrado)
        }
        else{
            contenedorCard.innerHTML='No encontrado'
        }
    }else{
        if(nombreIngresado==Number)
        filtrarPorPrecioButton()
    }
    //console.log(encontrado)

}
// Borramos el filtro de busqueda
function borrarFiltros(){
    contenedorBusqueda.value = ''
    renderizarProductos(producto)
}


// Evento practicado, en donde agragamos productos al carrito
let botones  = document.getElementsByClassName('compra');
for(const boton of botones){
    boton.addEventListener('click',()=>{
        const prodACarro = producto.find((item)=>item.id == boton.id);
        console.log(prodACarro);
        agregarACarrito(prodACarro);
    })
}

// funcion donde agregamos productos al carrito
function agregarACarrito(item){
    carro.push(item)
    console.table(carro);
    let total = carro.reduce((ac,producto)=> ac + producto.price,0)
    localStorage.setItem('carro',JSON.stringify(carro)) // cargamos el objeto al localStorage
    localStorage.setItem('total',total) // Cargamos el total del carrito al localStorage
}


// Esta funcion sirve para logearse, en caso de encontrar un usuario que coincida, muestra un alert y pasa un 1 al localStorage
function enviarDatosLogin(){
    const valor = JSON.parse(localStorage.getItem('usuario')) 
    if(valor){
        let usuarioL ={
            nombre:contenedorNombreLogin.value,
            password:contenedorPasswordLogin.value,
        }
        if(valor.nombre === usuarioL.nombre && valor.password === usuarioL.password){
            alert('Se logeo correctamente')
            localStorage.setItem('login',1)
            contenedorNombreLogin.value = ''
            contenedorPasswordLogin.value = ''
        }else{
            alert('credencial invalida')
        }
    }
}
