document.addEventListener('DOMContentLoaded',function(){
    fetchItems();
});

function fetchItems() {
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyNTM3OTEzLCJpYXQiOjE3MDI1Mzc2MTMsImp0aSI6IjMwN2EzMTI2Mzk1ODQzNTg4Y2EyZTVlMTU1ZjBiNzljIiwidXNlcl9pZCI6MX0.LWtBbs2nnTx1QtnDe9hzRHrW5eTstPRlgrKD3og2JzU'
    const token = localStorage.getItem('accessToken');
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
                <button type="button" class="btn btn-warning update-btn" data-bs-toggle="modal" data-bs-target="#editModal" data-id="${item.id}"><i class="fas fa-edit"></i>Update</button>
                <button type="button" class="btn btn-danger delete-btn" data-bs-toggle="modal" data-bs-target="#hapusModal" data-id="${item.id}"><i class="fas fa-delete"></i>Delete</button>
            </div>
        `;
        itemsContainer.appendChild(itemElement);
    });

    document.querySelectorAll('.update-btn').forEach(button =>{
        button.addEventListener('click',function(){
            openUpdateModal(this.getAttribute('data-id'));
        });
    });
}

    function openUpdateModal(id){
        const token = localStorage.getItem('accessToken')
        fetch(`http://127.0.0.1:8000/apia/item/${id}`,{
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data =>{
            document.getElementById('ubah-nama').value = data.name;
            document.getElementById('ubah-deskripsi').value = data.description;
            document.getElementById('updateItemId').value = data.id;
            $('#updateModal').modal('show');
        })
        .catch(error => console.error('Error :',error ))
    }