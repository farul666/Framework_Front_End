document.getElementById('tambah_data').addEventListener('submit', function(e){
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const token = localStorage.getItem('accessToken');

    fetch('http://127.0.0.1:8000/apia/item/',{
        method : 'POST',
        headers :
            {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
            },
        body: JSON.stringify({
            name : nama,
            description : deskripsi
        })
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        }else {
            throw new Error ('Salah!!!');
        }
    })
    .then(data =>{
        console.log('Success :',data);
        $('#exampleModal').modal('hide');
        window.location.reload()
    })
    .catch(error =>{
        console.error('Error :',error);
    });
});
    