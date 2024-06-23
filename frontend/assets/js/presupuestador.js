let codigoPresupuesto = null


//SET CURRENT DATE
const setDates = () => {
    //Today's date
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString().slice(0, 10);
    document.getElementById('fecha').value = formattedDate;

    //A month from now
    let fechaVenc = new Date();
    if (fechaVenc.getMonth() === 12) {
        fechaVenc.setMonth(0);
    } else {
        fechaVenc.setMonth(fechaVenc.getMonth() + 1)
    }
    let vencimientoFormatted = fechaVenc.toISOString().slice(0, 10);
    document.getElementById('fecha-venc').value = vencimientoFormatted;
};
//AUTO-CALUCLATE TOTAL
function calculateTotal() {
    let total = 0;
    let iva = 0

    const rows = document.querySelectorAll('#detalle-body tr');
    rows.forEach(row => {
        let quantity = parseInt(row.querySelector('input[name="cantidad"]').value);
        if (quantity === NaN || quantity === '') {
            row.querySelector('input[name="cantidad"]').value = 1
        }
        let discount = parseInt(row.querySelector('input[name="descuento"]').value);
        let unitPrice = parseFloat(row.querySelector('input[name="p-unitario"]').value);

        isNaN(discount) ? discount = 0 : discount
        let totalPrice = unitPrice * quantity * ((100 - discount) / 100);
        if (isNaN(totalPrice)) { totalPrice = 0; }
        row.querySelector('input[name="p-total"]').value = totalPrice.toFixed(2);

        total += totalPrice;
    });

    const ivaIncluido = document.getElementById('iva-incluido').checked;
    if (!ivaIncluido) {
        total *= 0.79;
        iva = 0
    } else {
        iva = total * 0.21
    }

    let div = document.getElementById("iva-discriminado-div") //DIV
    const ivaDiscriminado = document.getElementById('iva-discriminado').checked; //BUTTON
    if (ivaDiscriminado) {
        div.className = 'iva-discriminado-class'
        div.innerHTML = `<p><strong>IVA:</strong> ${iva.toFixed(2)}</p>`
    } else {
        div.className = 'hidden'
    }

    const totalInput = document.getElementById('total');
    totalInput.value = total.toFixed(2);
};
//POST
async function handleFromSubmit() {

    let productsData = getProducts()

    const formData = new FormData(presupuestador);

    const vendedor = formData.get('representante');
    const telVendedor = formData.get('telVendedor');
    const fechaVenc = formData.get('fecha-venc');
    const cliente = formData.get('cliente');
    const telCliente = formData.get('telCliente');
    const direccion = formData.get('direccion');
    const provincia = formData.get('provincia');
    const loc = formData.get('loc');
    const cp = formData.get('cp');
    const cuit = formData.get('cuit');
    const condicion = formData.get('condicion');
    const iva = formData.get('iva-incluido');
    const ivaDisc = formData.get('iva-discriminado');
    const comentario = formData.get('comentario');
    const total = formData.get('total');


    let body = {
        vendedor: vendedor,
        telVendedor: telVendedor.toString(),
        fecha: new Date().toISOString().slice(0, 10),
        fechaVenc: fechaVenc,
        cliente: cliente,
        telCliente: telCliente,
        direccion: direccion,
        provincia: provincia,
        loc: loc,
        cp: cp,
        cuit: cuit,
        condicion: condicion,
        iva: iva,
        ivaDisc: ivaDisc,
        productos: productsData,
        comentario: comentario,
        total: total,
        codigoPresupuesto: codigoPresupuesto
    };
    const setEmptyStringsToNull = (obj) => {
        for (const key in obj) {
            if (obj[key] === "") {
                obj[key] = null;
            }
        }
        return obj;
    };

    body = setEmptyStringsToNull(body);


    try {
        const response = await fetch(`/api/presupuestos/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        const responseData = await response.json();

        if (response.ok) {
            alert(responseData.message);
        } else {
            alert(`Error: ${responseData.message}`);
        }
    } catch (error) {
        console.error('Error saving in the database:', error);
    }
};
//Helper functions inside HandleFormSubmit
function getProducts() {

    //GO TO DETALLE TABLE
    let detalleTable = document.getElementById('detalle-body');

    //create a products array
    let products = []
    //iterate each row
    detalleTable.querySelectorAll('tr').forEach((row) => {

        //create an empty array/object for the row
        let productRow = {};
        row.querySelectorAll('input').forEach(input => {
            productRow[input.name] = input.value
        })
        //if there's data, then push the row array to the products array
        if (productRow.descripcion) products.push(productRow)
    })
    //when it's done return
    return products;
};
//get new code for presupuesto on each load
let fetchLastCode = async () => {
    try {
        const response = await fetch(`/api/presupuestos/ultimo`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json();
        return codigoPresupuesto = data.codigo + 1;
    } catch (error) {
        console.error('Error fetching last Presupuesto:', error);
    }
};
document.addEventListener('DOMContentLoaded', async () => {
    await fetchLastCode();
});

setDates();

document.querySelectorAll('input[name="p-unitario"], input[name="cantidad"], input[name="descuento"]').forEach(input => {
    input.addEventListener('input', calculateTotal);
});
document.getElementById('iva-incluido').addEventListener('change', calculateTotal);
document.getElementById('iva-discriminado').addEventListener('change', calculateTotal);

let presupuestador = document.querySelector('.presupuestador-from');
let guardar = document.getElementById('guardar-button');
guardar.addEventListener('click', async (event) => {
    event.preventDefault();
    handleFromSubmit();
});



//========================PRINT============================//

let originalInputs = []
let replaceInputs = () => {
    let inputs = document.querySelectorAll('input')

    inputs.forEach(input => {
        originalInputs.push(input)
        let span = document.createElement('span')
        if (input.type === 'checkbox') {
            input.checked === true ? span.textContent = 'Si' : span.textContent = 'No'
        } else {
            span.textContent = input.value
        }
        span.classList = 'input-span'
        input.parentNode.replaceChild(span, input)
    })
    return
};


let originalComentario = null;

let replaceComentario = () => {
    let comentario = document.getElementById('comentario')
    let val = comentario.value
    // comentario.classList = val === '' ? 'hidden' : ''

    if (val !== '') {
        originalComentario = comentario.cloneNode()
        let p = document.createElement('p')
        p.textContent = val
        p.classList = 'comentario-p'
        comentario.parentNode.replaceChild(p, comentario)
    } else if (val === '') {
        comentario.classList.add('hidden')
    }
}

let restoreComentario = () => {
    let comentario = document.getElementById('comentario')
    if (comentario && comentario.classList.contains('hidden')) comentario.classList.remove('hidden')

    let p = document.querySelector('.comentario-p')
    if (p) p.parentNode.replaceChild(originalComentario, p)

}

let restoreInputs = () => {
    //RESTORE VENDEDOR
    let infoContainer = document.querySelector('.presupuesto-info-container')
    let h3 = document.createElement('h3')
    h3.id = 'vendedor-h3'
    h3.innerText = 'VENDEDOR'
    infoContainer.parentNode.replaceChild(h3, infoContainer)
    //RESTORE TABLE INPUTS
    let spans = document.querySelectorAll('.input-span')
    spans.forEach((span, index) => {
        if (originalInputs[index]) {
            span.parentNode.replaceChild(originalInputs[index], span)
        }
    })
    return
};

let cleanTable = () => {
    let tableBody = document.querySelectorAll("input[name=p-total")
    tableBody.forEach(row => {
        row.value == 0.00 ? row.value = null : row.value
    })
    return
};

let setCode = () => {
    let h3 = document.getElementById('vendedor-h3')
    let infoContainer = document.createElement('div')
    infoContainer.className = 'presupuesto-info-container'
    infoContainer.innerHTML = `<div class="presupuesto-header">
                        <h2>PRESUPUESTO</h2>
                        <span class="presupuesto-num" id="presupuesto-num-span">#000-${codigoPresupuesto}</span>
                        </div>
                        <span class="presupuesto-subtext">*No valido como factura</span>`
    h3.parentNode.replaceChild(infoContainer, h3)
    return
};


document.querySelector('.print-button button').addEventListener('click', async (event) => {
    event.preventDefault();

    setCode();
    cleanTable();
    replaceInputs();
    replaceComentario();

    window.print();
});

window.addEventListener('afterprint', function () {
    restoreComentario();
    restoreInputs();
});
