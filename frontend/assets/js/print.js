document.querySelector('.print-button button').addEventListener('click', () => {
    window.print();
});

// let container = document.querySelector('.presupuestador-container')
let div = document.createElement('div')
div.className = 'logo-div'
body.appendChild(div)
div.innerHTML = ` <img src="../assets/images/th-logo.png" alt="Company Logo" class="logo"> `
