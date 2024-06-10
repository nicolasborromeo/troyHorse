document.querySelector('.print-button button').addEventListener('click', () => {
    cleanTable()
    replaceInputs()

    window.print();

});

window.addEventListener('afterprint', function() {
    restoreInputs();
});

let originalInputs = []

let replaceInputs = () => {
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
