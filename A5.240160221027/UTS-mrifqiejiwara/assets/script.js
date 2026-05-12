// WELCOME
window.onload = function(){

    alert(
        "Selamat datang di Portfolio M.Rifqie Jiwara 🔥"
    );

}

// VALIDASI FORM
document.getElementById("contactForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let nama =
    document.getElementById("nama").value;

    let email =
    document.getElementById("email").value;

    let pesan =
    document.getElementById("pesan").value;

    if(nama == "" || email == "" || pesan == ""){

        alert("Semua form wajib diisi!");

    }else{

        alert("Pesan berhasil dikirim!");

    }

});