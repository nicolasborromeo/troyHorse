document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch products when the DOM content is loaded
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => populateProductTable(data));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});

function populateProductTable(products) {
    let productsUi = document.getElementById('products-ui');

    productsUi.innerHTML =
        `<table id="product-table">
            <thead>
                <tr id='head-row'></tr>
            </thead>
            <tbody id='products-table-body'></tbody>
        </table>`;

    let firstProd = products[0];
    let tableHead = document.getElementById('head-row');

    for (let key in firstProd) {
        let col = document.createElement('th');
        col.innerText = key;
        tableHead.appendChild(col);
    }

    let productsTableBody = document.getElementById('products-table-body');

    products.forEach(product => {
        let row = document.createElement('tr');
        for (let key in product) {
            let colData = document.createElement('td');
            colData.innerText = product[key];
            row.appendChild(colData);
        }
        productsTableBody.appendChild(row);
    });
}

let searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(searchForm);
    const query = formData.get('descripcion');
    const orderBy = formData.get('orderBy');
    const direction = formData.get('direction');

    const queryString = new URLSearchParams({
        descripcion: query !== '' ? query : undefined,
        orderBy: orderBy !== 'null' ? orderBy : undefined,
        direction: direction
    }).toString();

    try {
        // Fetch products based on search parameters
        const response = await fetch(`/api/products/query?${queryString}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => populateProductTable(data));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
