    function updateSummaryRow() {
        const tableBody = document.getElementById('product-table').querySelector('tbody');
        const rows = document.querySelectorAll('.product-row');
    
        if (rows.length === 0) {
            const summaryRow = document.getElementById('summary-row');
            if (summaryRow) summaryRow.remove(); 
            return;
        }
    
        let totalDiscount = 0;
        let totalQuantity = 0;
        let totalExtendedPrice = 0;
        let rowCount = 0;
    
        rows.forEach(row => {
            const quantity = parseInt(row.querySelector('input[type="number"]').value, 10) || 0;
            const discount = parseFloat(row.querySelector('td:nth-child(4) input').placeholder.replace('%', '')) || 0;
            const extendedPrice = parseFloat(row.querySelector('td:nth-child(7) input').value.replace('$', '')) || 0;
    
            totalDiscount += discount;
            totalQuantity += quantity;
            totalExtendedPrice += extendedPrice;
            rowCount++;
        });
    
        const averageDiscount = rowCount > 0 ? (totalDiscount / rowCount).toFixed(2) : '0.00';
    
        let summaryRow = document.getElementById('summary-row');
        if (!summaryRow) {
            summaryRow = document.createElement('tr');
            summaryRow.id = 'summary-row';
            summaryRow.style.borderTop = '2px dotted #ccc'; 
            summaryRow.style.fontWeight = 'bold';
        }
    
        summaryRow.innerHTML = `
            <td colspan="2">Averages and Totals</td>
            <td>${totalQuantity}</td>
            <td>${averageDiscount}%</td>
            <td colspan="2">—</td>
            <td>${totalExtendedPrice.toFixed(2)}$</td>
        `;
    
        tableBody.appendChild(summaryRow);
    }
    
    
    document.getElementById('add-product').addEventListener('click', function () {
        const dropdown = document.getElementById('product-dropdown');
        const selectedOption = dropdown.options[dropdown.selectedIndex];
    
        if (selectedOption.value) {
            const productName = selectedOption.value;
            const unitPrice = selectedOption.getAttribute('data-price');
            const productCategory = selectedOption.getAttribute('product-category');
            const productSupplier = selectedOption.getAttribute('product-supplier');
    
            addProductToTable(productName, unitPrice, productCategory, productSupplier);
            dropdown.selectedIndex = 0;
    
            updateSummaryRow();
        } else {
            alert('Please select a product.');
        }
    });
    
document.getElementById('product-table').addEventListener('input', function (e) {
    if (e.target.type === 'number') {
        updateSummaryRow();
        updateOrderSummary(); 
    }
});

    
    document.getElementById('product-table').addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            const row = e.target.closest('tr');
            row.remove();
            updateSummaryRow();
        }
    });
  

function addProductToTable(productName, unitPrice, productCategory, productSupplier) {
    const tableBody = document.getElementById('product-table').querySelector('tbody');
    const rows = document.querySelectorAll('.product-row');
    const initialPrice = parseFloat(unitPrice.replace('$', '').replace(',', ''));
    const discountInputNumber = 30;

    let existingRow = null;
    rows.forEach(row => {
        const rowProductName = row.querySelector('td').textContent; 
        if (rowProductName === productName) {
            existingRow = row;
        }
    });

    if (existingRow) {
        const quantityInput = existingRow.querySelector('input[type="number"]');
        const extendedPriceInput = existingRow.querySelector('td:nth-child(7) input');
        const currentQuantity = parseInt(quantityInput.value, 10) || 1;
        const newQuantity = currentQuantity + 1; 
        quantityInput.value = newQuantity;

        const newExtendedPrice = (initialPrice * newQuantity * (100 - discountInputNumber)) / 100;
        extendedPriceInput.value = newExtendedPrice.toFixed(2) + '$';
    } else {
        const row = document.createElement('tr');
        row.classList.add('product-row'); 

        const productCell = document.createElement('td');
        productCell.textContent = productName;

        const priceCell = document.createElement('td');
        priceCell.textContent = unitPrice;

        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 1;
        quantityInput.min = 1;
        quantityInput.max = 10;
        quantityInput.style.width = '60px';
        quantityCell.appendChild(quantityInput);

        const discountCell = document.createElement('td');
        const discountInput = document.createElement('input');
        discountInput.type = 'text';
        discountInput.readOnly = true;
        discountInput.placeholder = discountInputNumber + '%';
        discountInput.style.width = '50px';
        discountCell.appendChild(discountInput);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = productCategory;

        const supplierCell = document.createElement('td');
        supplierCell.textContent = productSupplier;

        const extendedPriceCell = document.createElement('td');
        const extendedPriceInput = document.createElement('input');
        extendedPriceInput.type = 'text';
        extendedPriceInput.readOnly = true;
        extendedPriceInput.value = ((initialPrice * (100 - discountInputNumber)) / 100).toFixed(2) + '$';
        extendedPriceInput.style.width = '60px';
        extendedPriceCell.appendChild(extendedPriceInput);

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', function () {
            row.remove();
        });
        actionCell.appendChild(deleteButton);

        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(discountCell);
        row.appendChild(categoryCell);
        row.appendChild(supplierCell);
        row.appendChild(extendedPriceCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);

        quantityInput.addEventListener('input', function () {
            const quantity = parseInt(quantityInput.value, 10) || 1; 
            const newExtendedPrice = (initialPrice * quantity * (100 - discountInputNumber)) / 100;
            extendedPriceInput.value = newExtendedPrice.toFixed(2) + '$';
        });
    }
}

document.getElementById('search-button').addEventListener('click', function () {
    const searchQuery = document.getElementById('search-product').value.toLowerCase().trim();
    const rows = document.querySelectorAll('.product-row');
    
    rows.forEach(function (row) {
        const productNameCell = row.querySelector('td');
        if (productNameCell) {
            const productName = productNameCell.textContent.toLowerCase();
            
            if (productName.includes(searchQuery)) {
                row.style.display = ''; 

            } else {
                row.style.display = 'none';
            }
        }
    });
    
    if (!searchQuery) {
        rows.forEach(function (row) {
            row.style.display = ''; 
        });
    }
    });
    
    function updateOrderSummary() {
        const rows = document.querySelectorAll('.product-row');
        let subtotal = 0;
    
        rows.forEach(row => {
            const extendedPrice = parseFloat(row.querySelector('td:nth-child(7) input').value.replace('$', '')) || 0;
            subtotal += extendedPrice;
        });
    
        document.getElementById('subtotal').value = `${subtotal.toFixed(2)}$`;
    
        const freight = parseFloat(document.getElementById('freight').value) || 0;
        const total = subtotal + freight;
        document.getElementById('total').value = `${total.toFixed(2)}$`;
    }
    
    document.getElementById('freight').addEventListener('input', updateOrderSummary);
    
    document.getElementById('add-product').addEventListener('click', updateOrderSummary);
    document.getElementById('product-table').addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') updateOrderSummary(); 
    });
    

    document.getElementById('submit-order').addEventListener('click', function () {
        const customerName = document.getElementById('customer-name').value;
        const employeeName = document.getElementById('employee-name').placeholder;
        const orderDate = document.getElementById('order-date').value;
        const shippedDate = document.getElementById('shipped-date').value;
        const requiredDate = document.getElementById('required-date').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const region = document.getElementById('region').value;
        const postalCode = document.getElementById('postal-code').value;
        const shipVia = document.getElementById('ship-via').value;
        const total = document.getElementById('total').value;
        const rows = document.querySelectorAll('.product-row');
        const freight = parseFloat(document.getElementById('freight').value) || 0;

        if (!address || !city || !orderDate || !requiredDate || !shippedDate || rows.length == 0 ) {
            alert('Please fill out all required fields!');
            return;
        }
        
        const orderData = {
            customerName: customerName,
            employeeName: employeeName,
            orderDate: orderDate,
            shippedDate:shippedDate,
            requiredDate: requiredDate,
            address:address,
            city:city,
            region:region,
            postalCode:postalCode,
            shipVia: shipVia,
            freight: freight,
            totalPrice: total,
            products: []
        };
    
        rows.forEach(row => {
            const productName = row.querySelector('td:nth-child(1)').textContent;
            const quantity = parseInt(row.querySelector('input[type="number"]').value, 10) || 1;
            const discount = row.querySelector('td:nth-child(4) input').placeholder || 0;
            const unitPrice = parseFloat(row.querySelector('td:nth-child(2)').textContent.replace('$', '').replace(',', '')) || 0;
            const productCategory = row.querySelector('td:nth-child(5)').textContent || '';
            const productSupplier = row.querySelector('td:nth-child(6)').textContent || '';
            const extendedPrice = parseFloat(row.querySelector('td:nth-child(7) input').value.replace('$', '')) || 0;
    
            orderData.products.push({
                productName: productName,
                discount:discount,
                quantity: quantity,
                productCategory: productCategory,
                productSupplier: productSupplier,
                unitPrice: unitPrice,
                extendedPrice: extendedPrice
            });
        });
    
        const blob = new Blob([JSON.stringify(orderData, null, 2)], { type: 'e-commerce/json' });
    
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'order-summary.json'; 
    
        link.click();
    
        alert(`Order submitted successfully!`);
    });
    
    
// const customerNameInput = document.getElementById('customer-name');
// const customerNameSummary = document.getElementById('customer-name-summary');

// customerNameInput.addEventListener('input', function () {
//     if (customerNameInput.value.trim() !== "") {
//         customerNameSummary.value = customerNameInput.value;
//     } else {
//         customerNameSummary.value = customerNameInput.placeholder;
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    document.getElementById('required-date').setAttribute('min', formattedDate);
    document.getElementById('order-date').setAttribute('min', formattedDate);
});

    function updateShippedDate() {
        const shippedDateField = document.getElementById('shipped-date');
        const currentDate = new Date();
    
        const day = String(currentDate.getDate()).padStart(2, '0'); 
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const year = currentDate.getFullYear();
    
        const formattedDate = `${year}-${month}-${day}`;
        shippedDateField.value = formattedDate;
    }
    
    document.addEventListener('DOMContentLoaded', updateShippedDate);
    
    