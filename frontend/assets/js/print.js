

document.querySelector('.print-button button').addEventListener('click', async (event) => {
    event.preventDefault();

    // await fetchLast() // change this
    setCode()
    cleanTable()
    replaceInputs()

    window.print();

});

window.addEventListener('afterprint', function () {
    restoreInputs();
});

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
}


let cleanTable = () => {
    let tableBody = document.querySelectorAll("input[name=p-total")
    tableBody.forEach(row => {
        row.value == 0.00 ? row.value = null : row.value
    })
    return
}

let setCode =() => {
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
}

// let fetchLast = async () => {
//     try {
//         const response = await fetch(`/api/presupuestos/ultimo`, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         }).then(res => res.json())
//         .then(data => {

//             let h3 = document.getElementById('vendedor-h3')
//             let infoContainer = document.createElement('div')
//             infoContainer.className = 'presupuesto-info-container'
//             infoContainer.innerHTML = `<div class="presupuesto-header">
//                                 <h2>PRESUPUESTO</h2>
//                                 <span class="presupuesto-num" id="presupuesto-num-span">#000-${data.codigo + 1}</span>
//                                 </div>
//                                 <span class="presupuesto-subtext">*No valido como factura</span>`
//             h3.parentNode.replaceChild(infoContainer, h3)
//             return
//         });
//     } catch (error) {
//         console.error('Error fetching last Presupuesto:', error);
//     }
// }
