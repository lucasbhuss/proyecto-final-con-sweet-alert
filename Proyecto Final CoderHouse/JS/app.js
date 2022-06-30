// Variables globales
let g_saveInfo = false;
let g_precioPlan = 0
let g_mesesContrato = [1, 3, 6, 12]
let g_descuentoMesesContrato = [0, 5, 7, 10]
const servicios = [];
const g_serviciosAdicionales = [];
const facturacionClientes = [];

let g_DescuentoServicio = 0
let g_precioServicioAdicional = 0

let g_usuario = {
    nombre: localStorage.getItem("nombre")
}




// Constructores de objetos

class Servicios {
    constructor(id , nombre, precio) {
        this.id = Number(id),
        this.nombre = nombre,
        this.precio = Number(precio)
    };
};

class ServicioAdicional {
    constructor(id, nombre, precio) {
        this.id = Number(id),
        this.nombre = nombre,
        this.precio = Number(precio)
    };
};


// Servicios
servicios.push(new Servicios(1, "Personal", 469.99));
servicios.push(new Servicios(2, "Basico", 895.99));
servicios.push(new Servicios(3, "Avanzado", 1390.99));
servicios.push(new Servicios(4, "Profesional", 1979.99));

g_serviciosAdicionales.push(new ServicioAdicional(1, "Ninguno", 0));
g_serviciosAdicionales.push(new ServicioAdicional(2, "Soporte en línea 24/7", 495.99));
g_serviciosAdicionales.push(new ServicioAdicional(3, "Almacenamiento adicional de 50gb", 390.99));
g_serviciosAdicionales.push(new ServicioAdicional(4, "Ancho de banda ilimitado", 359.99));




// Eventos

window.onload = function() {

    // EVENTOS
        let btn_finalizarCompra = document.getElementById("btn-pagar")
        if (btn_finalizarCompra) {
            btn_finalizarCompra.addEventListener("click", finalizarCompra)
        };


        let btn_contratar = document.getElementsByClassName("boton-contratar")
        if (btn_contratar) {
            Array.prototype.forEach.call(btn_contratar, function(btn) {
                btn.addEventListener("click", function() {
                    g_precioPlan = muestroPlan(btn.value)
                    mostrarVentanaPago()
                    calcularTotalCompra()
                })
            });
        };


        let cbo_cuotas = document.getElementById("meses-contrato")
        if (cbo_cuotas) {
            cbo_cuotas.addEventListener("change",  function() { 
            if (cbo_cuotas.value >= 2) {
                let ind = g_mesesContrato.indexOf(parseInt(cbo_cuotas.value))
                let porcDescuento = g_descuentoMesesContrato[ind];
                g_DescuentoServicio = (g_precioPlan * porcDescuento /100) .toFixed(2)
    
    
                let descuentoAplicado = document.createElement("div")
                descuentoAplicado.innerHTML =  `<div class="text-success">
                                                <h6 class="my-0">Descuento del ${porcDescuento}%!</h6>
                                                <small>Por contratar mas de un mes</small>
                                                </div>
                                                <span class="text-success">-$${g_DescuentoServicio}</span>`
                let carrito = document.getElementById("descuento-aplicado");
                if (carrito) {
                    carrito.innerHTML = "";
                    carrito.appendChild(descuentoAplicado);
                }
            } else {
                let carrito = document.getElementById("descuento-aplicado");
                carrito && (carrito.innerHTML = "");
                g_DescuentoServicio = 0
            };
            calcularTotalCompra()
            });
        };

        cargarMesesServicio();
        cargarServicioAdicional();



        let servicioAdicionalSeleccionado = document.getElementById("servicio-adicional")
        if (servicioAdicionalSeleccionado) {
            servicioAdicionalSeleccionado.addEventListener("change", function (){
            
            if (servicioAdicionalSeleccionado.value >=2) {
                let servSelected = g_serviciosAdicionales.find(item => item.id == servicioAdicionalSeleccionado.value);
                g_precioServicioAdicional = servSelected.precio
                let displayAdicional = document.createElement("div")
                displayAdicional.innerHTML = `<div>
                                              <h6 class="my-0">${servSelected.nombre}</h6>
                                              <span class="text-muted">$${servSelected.precio}</span>
                                              </div>`
                let carritoAdicional = document.getElementById("adicional-seleccionado");
                if (carritoAdicional) {
                    carritoAdicional.innerHTML = "";
                    carritoAdicional.appendChild(displayAdicional);
                };
            } else {
                let carrito = document.getElementById("adicional-seleccionado");
                if (carrito) {
                    carrito.innerHTML = "";
                    g_precioServicioAdicional = 0
                };
                
            };
            calcularTotalCompra()


            });
        };

    


// Local Storage

        g_saveInfo = localStorage.getItem("save_info")
        getLocalStorage()

        let save_info = document.getElementById("save-info")
        save_info.checked = g_saveInfo
        if (save_info) {
            save_info.addEventListener("change", function (event){
                g_saveInfo = event.target.checked;
                localStorage.setItem("save_info", g_saveInfo)
                setLocalStorage()
            });
        }

        let firstName = document.getElementById("firstName")
        if (firstName) {
            firstName.addEventListener("change", function (event){
                setLocalStorage()
            });
                
        };
        let lastName = document.getElementById("lastName")
        if (lastName) {
            lastName.addEventListener("change", function (event){
                setLocalStorage()
            });
                
        };
        let username = document.getElementById("username")
        if (username) {
            username.addEventListener("change", function (event){
                setLocalStorage()
            });
                
        };
        let email = document.getElementById("email")
        if (email) {
            email.addEventListener("change", function (event){
                setLocalStorage()
            });
  
        };

}; // Fin de window onload




// Local Storage

function getLocalStorage() {
    if (g_saveInfo) {
        let firstName = document.getElementById("firstName")
        if (firstName) {
            firstName.value = localStorage.getItem("nombre")
        }
        let lastName = document.getElementById("lastName")
        if (lastName) {
            lastName.value = localStorage.getItem("apellido")
        }
        let username = document.getElementById("username")
        if (username) {
            username.value = localStorage.getItem("username")
        }
        let email = document.getElementById("email")
        if (email) {
            email.value = localStorage.getItem("email")
        }
    }
}

function setLocalStorage() {
    if (g_saveInfo) {
        let firstName = document.getElementById("firstName")
        if (firstName) {
            localStorage.setItem("nombre", firstName.value)
        }
        let lastName = document.getElementById("lastName")
        if (lastName) {
            localStorage.setItem("apellido", lastName.value)
        }
        let username = document.getElementById("username")
        if (username) {
            localStorage.setItem("username", username.value)
        }
        let email = document.getElementById("email")
        if (email) {
            localStorage.setItem("email", email.value)
        }
    }
    else {
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellido")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
    }
}

// Cargar Servicios

function cargarMesesServicio() {
    let cbo_cuotas = document.getElementById("meses-contrato")
    if (cbo_cuotas) {
    
        for(let i = 0; i < g_mesesContrato.length; i++) {
            let option1 = document.createElement("option");
            option1.setAttribute("value", g_mesesContrato[i]);
            let option1Texto = document.createTextNode(g_mesesContrato[i] + " mes/es");
            option1.appendChild(option1Texto);
            cbo_cuotas.appendChild(option1);
        };
    };    
};

function cargarServicioAdicional() {
    let display_adicional = document.getElementById("servicio-adicional")
    if (display_adicional) {
    
        for(let i = 0; i < g_serviciosAdicionales.length; i++) {
            let option1 = document.createElement("option");
            option1.setAttribute("value", g_serviciosAdicionales[i].id);
            let option1Texto = document.createTextNode(g_serviciosAdicionales[i].nombre);
            option1.appendChild(option1Texto);
            display_adicional.appendChild(option1);
        };
    };
};




// Mostrar ventanas de pago y ocultar planes

function mostrarVentanaPago() {
    document.getElementById("payment").style.display = "block";
    document.getElementById("plan-info").style.display = "none";
    document.getElementById("caracteristicas-style").style.display = "none";
    document.getElementById("pricing-display").style.display = "none";
};





// Funciones para comprar

function muestroPlan(planId){
    let servSelected = servicios.find(item => item.id == planId);
    let servicePrice = servSelected.precio;

    let servicioEnCarrito = document.createElement("div")
    servicioEnCarrito.innerHTML = `<div>
                          <h6 class="my-0">Plan ${servSelected.nombre}</h6>
                          <span class="text-muted">$${servSelected.precio}</span>
                          </div>`
    let carrito = document.getElementById("servicio-seleccionado");
    carrito && carrito.appendChild(servicioEnCarrito);
    return servicePrice;
};


function calcularTotalCompra(){

    let total = (g_precioPlan + g_precioServicioAdicional) - g_DescuentoServicio

    let displayTotal = document.createElement("strong")
    displayTotal.innerHTML = `<strong>Total por mes: $${total}</strong>`

    let carritoTotal = document.getElementById("total-compra");
    if (carritoTotal) {
        carritoTotal.innerHTML = "";
        carritoTotal.appendChild(displayTotal);
    } 
};

function finalizarCompra() {
    
    Swal.fire({
        title: '¿Desea finalizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Pagar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Su compra fue realizada con éxito!',
            'La informacion será enviada a su mail.',
            'success'
          )
        }
      })
    
};

calcularTotalCompra()


