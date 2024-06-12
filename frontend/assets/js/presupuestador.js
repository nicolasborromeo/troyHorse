// window.onclick((event)=> {event.preventDefault()})

//SET CURRENT DATE
let currentDate = new Date();
let formattedDate = currentDate.toISOString().slice(0, 10);
document.getElementById('fecha').value = formattedDate;
//AUTO-CALUCLATE TOTAL
document.querySelectorAll('input[name="p-unitario"], input[name="cantidad"], input[name="descuento"]').forEach(input => {
    input.addEventListener('input', calculateTotal);
});
function calculateTotal() {
    const rows = document.querySelectorAll('#detalle-body tr');
    let total = 0;
    let iva = 0
    rows.forEach(row => {
        let quantity = parseInt(row.querySelector('input[name="cantidad"]').value);
        const unitPrice = parseFloat(row.querySelector('input[name="p-unitario"]').value);
        let discount = parseInt(row.querySelector('input[name="descuento"]').value);

        isNaN(discount) ? discount = 0 : discount
        let totalPrice = unitPrice * quantity * ((100 - discount) / 100);
        if (isNaN(totalPrice)) {totalPrice = 0;}
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
    if(ivaDiscriminado){
        div.className = 'iva-discriminado-class'
        div.innerHTML=`<p><strong>IVA:</strong> ${iva}</p>`
    } else {
        div.className = 'hidden'
    }

    const totalInput = document.getElementById('total');
    totalInput.value = total.toFixed(2);
}
// Add event listener to checkboxes for IVA options
document.getElementById('iva-incluido').addEventListener('change', calculateTotal);
document.getElementById('iva-discriminado').addEventListener('change', calculateTotal);
// Calculate the total initially
calculateTotal();








let presupuestador = document.querySelector('.presupuestador-from')
presupuestador.addEventListener('submit', async (event) => {
    event.preventDefault();
    handleFromSubmit()





})

async function handleFromSubmit() {
    let productsData = getProducts()

    const formData = new FormData(presupuestador);
    // let entries = formData.entries()
    // entries.forEach(element => {
    //     console.log(element)
    // });
    // console.log('FORM DATA----',)

    const vendedor = formData.get('representante');
    const telVendedor = formData.get('telVendedor');

    // const fecha = formData.get('fecha');
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
        telVendedor: telVendedor,
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
        total: total
    }

    try {
        // Fetch products based on search parameters
        const response = await fetch(`/api/presupuestos/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data => console.log(data));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

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
        if(productRow.descripcion) products.push(productRow)
    })
        //when it's done return
        return products;
}
