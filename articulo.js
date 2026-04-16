class Info {
    constructor(items) {
        this.items = items
    }

    htmlCode() {
        this.items.map(elemento => {
            document.querySelector('head').innerHTML += `
                <title>${elemento.producto} - Jardín Store</title>
            `
            document.querySelector('#informacion').innerHTML += `
            <div class='product-card'>
                <div class="product-image-container">
                    <img src='${elemento.img}' alt='${elemento.producto}' class="product-image">
                </div>
                <div class="product-info">
                    <h1>${elemento.producto}</h1>
                    <p class="product-description">${elemento.descripcion}</p>
                    <div class="product-details">
                        <h3>Detalles:</h3>
                        <p>${elemento.detalles}</p>
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

const arrayInfo = JSON.parse(localStorage.getItem('infoUsuario'))

const info = new Info(arrayInfo)

info.htmlCode()