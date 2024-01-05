document.getElementById('updateItemForm').addEventListener('submit', function(e){
    e.preventDefault();

    const nama = document.getElementById('ubah-nama').value;
    const deskripsi = document.getElementById('ubah-deskripsi').value;
    const itemId = document.getElementById('updateItemId').value;

    // warrning pada pengisian field
    if (nama == '' || deskripsi == ''){
        alert('isi dulu blog!');
        return
    }

    const data = {
        name: nama,
        description: deskripsi,
    };

    const token = localStorage.getItem('accessToken');

    fetch(`http://127.0.0.1:8000/apia/item/${itemId}/`,{
        method:'PUT',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type'  : 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Lu salah AJG!!');
        }
        return response.json();
    })
    .then(updateItem => {
        console.log('Succes :' ,data);
        $('#updateModal').modal('hide');
        window.location.reload()
    })
    .catch(error => {
        console.error('Error :',error);
    });
});