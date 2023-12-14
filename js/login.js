document.getElementById('loginform').addEventListener('submit',function(event) {
   event.preventDefault();
   
   const username = document.getElementById ('username').value;
   const password = document.getElementById ('password').value;
   const messageDiv = document.getElementById ('message');

   fetch('http://127.0.0.1:8000/apia/token/',{
    method: 'POST',
    headers: { 'Content-type': 'application/json'},
    body: JSON.stringify({username,password})
   })
   .then (response => {
    if (!response.ok) {
        throw new Error ('Login Failed ');
    }
    return response.json();
   })
   .then(data =>{
    if (data.acces){
        localStorage.setItem('accesToken',data.acces);
        messageDiv.textContent = 'login succesful';
        messageDiv.style.color = 'green';
        // redirect atau update ui setelah login sukses
        // window.location.href = '/MateriKuliah/Framework/tes/coba.html';
    }
   })
   .catch (error => {
    console.error('Error',error);
    messageDiv.textContent = 'Login failed: Invalid Username or password';
    messageDiv.style.color= 'red';
   });
});