document.addEventListener('DOMContentLoaded', function() {
    const itemsContainer = document.getElementById('items');
    let deleteItemId = null; // Id item dihapus

    //Event Listener untuk tombol hapus
    itemsContainer.addEventListener('click', function (e){
        if (e.target.classList.contains('delete-btn')) {
            deleteItemId = e.target.getAttribute('data-id');
            $('#deleteConfirmModal').modal('show');
        }
    });

    // Event listenerr untuk konfirmasi hapus

    document.getElementById('confirmDelete').addEventListener('click',function() {
        if (deleteItemId) {
            fetch(`http://127.0.0.1:8000/apia/item/${deleteItemId}`,{
                method: 'DELETE',
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type' : 'application/json',
                }
            })
            .then (response => {
                if (!response.ok){
                    throw new Error('Gagal Total tot');
                }
                //Cek apakah respons memiliki konten
                if (response.status !== 204){//204 no content
                    return response.json();
                }
            })
            .then (() => {
                console.log('Item Dihapus');
                $('#deleteConfirmModal').modal('hide');
                //opsional: hapus elemen item dari UI atau refresh halaman
                window.location.reload()
            })
            .catch (error => console.error('Error: ',error));
        }
    });
})