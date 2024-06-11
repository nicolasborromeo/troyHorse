

//PROBLEM
//I NEED TO GET THE BUDGET NUMBER
//the busget is in the database I can ony get it by fetch requests

//PLAN
//make a fetch to presupuestos/last
//return the number id of the last budget / potentitally its going to be ana ytribute on the budget later

//CARRY OUT THE PLAN
let fetchLast = async () => {
try {
    // Fetch products based on search parameters
    const response = await fetch(`/api/presupuestos/ultimo`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json())
    // .then(data => {
    //     return data
    // });
} catch (error) {
    console.error('Error fetching products:', error);
}
}

// let getId = async() => {
//     let ultimoPresupuesto = await Presupuesto.findAll({
//         order:[['id', 'DESC']],
//         limit: 1
//     })
//     return ultimoPresupuesto + 1
// }



document.querySelector('.print-button button').addEventListener('click', () => {
    let title = document.querySelector('.page-title')
    title.innerText ='THFlooring Inc.'

    cleanTable()
    replaceInputs()

    window.print();

});

window.addEventListener('afterprint', function() {
    restoreInputs();
});

let originalInputs = []
let replaceInputs = async () => {
    let h3 = document.getElementById('vendedor-h3')
    h3.innerHTML=`PRESUPUESTO <span>*No valido como factura</span>`

    let inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        originalInputs.push(input)
        let span = document.createElement('span')
        if(input.type === 'checkbox') {
            input.checked === true ? span.textContent = 'Si' : span.textContent = 'No'
        } else{
            span.textContent = input.value
        }
        span.classList = 'input-span'
        input.parentNode.replaceChild(span, input)
    })
    return
}

let restoreInputs = () => {
    let h3 = document.getElementById('vendedor-h3')
    h3.innerText = 'VENDEDOR'
    let spans = document.querySelectorAll('.input-span')
    spans.forEach((span, index) => {
        if(originalInputs[index]) {
            span.parentNode.replaceChild(originalInputs[index], span)
        }
    })
    return
}


let cleanTable = () => {
    let tableBody = document.querySelectorAll("input[name=p-total")
    tableBody.forEach(row => {
        console.log(row.value)
        row.value == 0.00 ? row.value = null : row.value
    })
    return
}
