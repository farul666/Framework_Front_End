document.addEventListener('DOMContentLoaded',function(){
    fetchItems();
});

function fetchItems() {
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyNTM3OTEzLCJpYXQiOjE3MDI1Mzc2MTMsImp0aSI6IjMwN2EzMTI2Mzk1ODQzNTg4Y2EyZTVlMTU1ZjBiNzljIiwidXNlcl9pZCI6MX0.LWtBbs2nnTx1QtnDe9hzRHrW5eTstPRlgrKD3og2JzU'
    const token = localStorage.getItem('accesToken');
    fetch('http://127.0.0.1:8000/apia/item/',
    {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }
    )
    
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error(('Error:'. error)));
}

function displayItems (items) {
    const itemsContainer = document.getElementById('items');
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('col-md-4')
        itemElement.innerHTML = `
            <div class ="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description} </p>
                </div>
            </div>
        `;
        itemsContainer.appendChild(itemElement);
    });
}