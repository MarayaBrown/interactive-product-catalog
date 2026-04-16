const main = document.querySelector('#articulos')
const searchInput = document.querySelector('#search-input')
const noResults = document.querySelector('#no-results')
const info = []
let allProducts = []

localStorage.removeItem("infoUsuario");

async function get() {
    try {
        let response = await fetch('articulos.json')
        if (response.ok) {
            let data = await response.json()
            allProducts = data
            renderProducts(data)
            setupSearch()
        } else {
            new Error('Error en la solicitud' + response.statusText)
        }
    } catch (error) {
        alert(error.message)
    }
}

function renderProducts(products) {
    main.innerHTML = ''
    
    if (products.length === 0) {
        noResults.style.display = 'block'
        return
    }
    
    noResults.style.display = 'none'
    
    products.forEach(element => {
        const { producto, descripcion, precio, img, id } = element
        main.innerHTML += `
            <div class='cardProduct' data-id='${id}'>
                <img src='${img}' alt='${producto}'>
                <h2>${producto}</h2>
                <p>${descripcion}</p>
                <span class='price'>$${precio}</span>
                <button class='btn' id='${id}'>Ver más información</button>
            </div>
        `
    })
    
    setupButtons()
}

function setupSearch() {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim()
        
        const filtered = allProducts.filter(product => {
            return product.producto.toLowerCase().includes(searchTerm) ||
                   product.descripcion.toLowerCase().includes(searchTerm)
        })
        
        renderProducts(filtered)
    })
}

function setupButtons() {
    let botones = document.querySelectorAll('.btn')
    
    for (const btn of botones) {
        btn.addEventListener('click', (evento) => {
            evento.stopPropagation()
            let resultado = allProducts.find(el => el.id == evento.target.id)
            
            if (resultado == undefined) {
                alert('Ocurrió un error')
            } else {
                info.length = 0
                info.push(resultado)
                localStorage.setItem('infoUsuario', JSON.stringify(info))
                window.open('articulo.html', "_self");
            }
        })
    }
}

get()