const main = document.querySelector('#articulos')
const searchInput = document.querySelector('#search-input')
const noResults = document.querySelector('#no-results')
const productCountEl = document.querySelector('#product-count')
const info = []
let allProducts = []

const CONFIG = {
    STORAGE_KEY: 'infoUsuario',
    DETAIL_PAGE: 'articulo.html'
}

localStorage.removeItem(CONFIG.STORAGE_KEY);

function createToast(message, type = 'error') {
    const toast = document.createElement('div')
    toast.className = `toast toast-${type}`
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => toast.classList.add('toast-show'), 10)
    setTimeout(() => {
        toast.classList.remove('toast-show')
        setTimeout(() => toast.remove(), 300)
    }, 3000)
}

function showLoading() {
    main.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Cargando productos...</p>
        </div>
    `
}

function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

async function get() {
    showLoading()
    
    try {
        let response = await fetch('articulos.json')
        if (response.ok) {
            let data = await response.json()
            allProducts = data
            renderProducts(data)
            setupSearch()
        } else {
            throw new Error('Error en la solicitud: ' + response.statusText)
        }
    } catch (error) {
        main.innerHTML = `
            <div class="error-state">
                <p>❌ Error al cargar los productos</p>
                <button onclick="get()" class="retry-btn">Reintentar</button>
            </div>
        `
        createToast('Error al cargar los productos', 'error')
    }
}

function renderProducts(products) {
    main.innerHTML = ''
    
    if (products.length === 0) {
        noResults.style.display = 'flex'
        productCountEl.textContent = '0 productos'
        return
    }
    
    noResults.style.display = 'none'
    
    const countText = products.length === 1 ? '1 producto' : `${products.length} productos`
    productCountEl.textContent = countText
    
    const html = products.map(element => {
        const { producto, descripcion, precio, img, id } = element
        return `
            <div class='cardProduct' data-id='${id}'>
                <img src='${escapeHtml(img)}' alt='${escapeHtml(producto)}'>
                <h2>${escapeHtml(producto)}</h2>
                <p>${escapeHtml(descripcion)}</p>
                <span class='price'>$${precio.toLocaleString('es-AR')}</span>
                <button class='btn' id='${id}'>Ver más información</button>
            </div>
        `
    }).join('')
    
    main.innerHTML = html
    
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
    const buttons = document.querySelectorAll('.btn')
    
    for (const btn of buttons) {
        btn.addEventListener('click', (event) => {
            event.stopPropagation()
            const product = allProducts.find(el => el.id == event.target.id)
            
            if (!product) {
                createToast('Ocurrió un error', 'error')
                return
            }
            
            info.length = 0
            info.push(product)
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(info))
            window.open(CONFIG.DETAIL_PAGE, '_self')
        })
    }
}

get()