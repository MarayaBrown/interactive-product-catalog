function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

function showErrorAndRedirect(message) {
    document.getElementById('informacion').innerHTML = `
        <div class="error-state">
            <p>❌ ${message}</p>
            <a href="index.html" class="back-btn">Volver al catálogo</a>
        </div>
    `
}

class Info {
    constructor(items) {
        this.items = items
    }

    htmlCode() {
        this.items.map(elemento => {
            document.title = `${escapeHtml(elemento.producto)} - Jardín Store`
            
            document.getElementById('informacion').innerHTML = `
            <div class='product-card'>
                <div class="product-image-container">
                    <img src='${escapeHtml(elemento.img)}' alt='${escapeHtml(elemento.producto)}' class="product-image">
                </div>
                <div class="product-info">
                    <h1>${escapeHtml(elemento.producto)}</h1>
                    <p class="product-description">${escapeHtml(elemento.descripcion)}</p>
                    <div class="product-details">
                        <h3>Detalles:</h3>
                        <p>${escapeHtml(elemento.detalles)}</p>
                    </div>
                    <div class="product-price">$ ${elemento.precio.toLocaleString('es-AR')}</div>
                    <button class="back-btn">
                        <a href="index.html">← Volver al catálogo</a>
                    </button>
                </div>
            </div>
            `
        })
    }
}

const storedData = localStorage.getItem('infoUsuario')

if (!storedData) {
    showErrorAndRedirect('No se encontró información del producto')
} else {
    try {
        const arrayInfo = JSON.parse(storedData)
        
        if (!arrayInfo || arrayInfo.length === 0) {
            showErrorAndRedirect('El producto no está disponible')
        } else {
            const info = new Info(arrayInfo)
            info.htmlCode()
        }
    } catch (error) {
        showErrorAndRedirect('Error al cargar los datos del producto')
    }
}