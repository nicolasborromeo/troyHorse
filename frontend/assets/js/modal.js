let selectedProduct = null;
let initDescription = null;
let selectedRow = null

//HELPER FUNCTION TO POPULATE DATA
let _populateTable = (data) => {

    const productsTable = document.getElementById("products-ui").getElementsByTagName("tbody")[0];
    productsTable.innerHTML = ""; // Clear any existing rows

    data.forEach(product => {
        const row = productsTable.insertRow();
        row.insertCell(0).textContent = product.codigo;
        row.insertCell(1).textContent = product.descripcion;
        row.insertCell(2).textContent = product.medidasValor;
        row.insertCell(3).textContent = product.medidasType;
        row.insertCell(4).textContent = product.precio;

        row.classList.add('product-row'); // add a class to later iterate over
        row.dataset.product = JSON.stringify(product);

        row.addEventListener('click', () => {
            document.querySelectorAll('.product-row').forEach(row => {
                row.classList.remove('selected-row') //if a row was selected now it will be unselected
            })
            row.classList.add('selected-row') // selects the row
            selectedProduct = product;
        })
        });
}

//WHEN ? IN DESCRIPTION OPEN MODAL AND POPULATE DATA
document.querySelectorAll('input[name="descripcion"]').forEach(input => {
    input.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (input.value.includes('?')) {

                //SAVE THE ROW TO LATER POPULATE WITH DATA
                selectedRow = document.activeElement.closest('tr')
                console.log('selectedROW', selectedRow)

                //OPEN MODAL
                const modal = document.getElementById("myModal");
                const modalBody = document.getElementById("modal-body");
                modal.style.display = "block";

                //INITIATE QUERY PARSING
                let string = input.value
                let query = string.split('?')[1]
                initDescription = query //set in for further organization later

                const queryString = new URLSearchParams({
                    descripcion: query !== '' ? query : undefined,
                    orderBy: undefined,
                    direction: undefined
                }).toString();

                try {//FECH
                    const response = await fetch(`api/products/presu?descripcion=${query}`);
                    const data = await response.json();

                   _populateTable(data)

                    } catch (error) {
                        console.error('Error fetching data:', error);
                        modalBody.innerHTML = 'Error fetching data.';
                    }
                }

        }
        });
});

//ORGANIZR INSIDE
document.querySelector('.search-button').addEventListener('click', async () => {

    const orderBy = document.querySelector('.order-by').value;
    const direction = document.querySelector('.order-select').value;

    queryString = new URLSearchParams({
        descripcion: initDescription,
        orderBy: orderBy !== 'null' ? orderBy : undefined,
        direction: direction
    }).toString();

    console.log(queryString)
    try {
        const response = await fetch(`api/products/query?${queryString}`);
        const data = await response.json();
        _populateTable(data)

    } catch (error) {
        console.error('Error fetching data:', error);
        modalBody.innerHTML = 'Error fetching data.';
    }
});


//CLOSE MODAL FUNCTIONS --
// Close the modal when the user clicks on <span> (x)
document.querySelector(".close").onclick = function () {
    document.getElementById("myModal").style.display = "none";
    selectedProduct = null
};
// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    // console.log(event.target)
    const cancelar = document.getElementById("cancelar")
    const agregar = document.getElementById("agregar")

    if (event.target == modal || event.target == cancelar) {
        modal.style.display = "none";
        selectedProduct = null
    }

//--------------------- AGREGAR PRODUCTO -----------------
    if(event.target == agregar) {
        if(selectedProduct) {
            console.log(selectedProduct)
            modal.style.display = "none";
            selectedRow.querySelector('input[name ="codigo"]').value = selectedProduct.codigo
            selectedRow.querySelector('input[name ="descripcion"]').value = selectedProduct.descripcion
            // if (!selectedRow.querySelector('input[name ="cantidad"]').value) selectedRow.querySelector('input[name ="cantidad"]').value = 1
            selectedRow.querySelector('input[name ="p-unitario"]').value = selectedProduct.precio

        } else{
            alert('Please select a product first.');
            return;
        }
    }
};




document.querySelector('.print-button button').addEventListener('click', () => {
    window.print();
});
