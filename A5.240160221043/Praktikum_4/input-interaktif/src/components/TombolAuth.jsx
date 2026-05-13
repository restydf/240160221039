import React, { useState } from 'react';

function TombolAuth() {
  // 1. Inisialisasi state dengan membaca dari localStorage.
  //    Jika item 'isLoggedIn' ada dan nilainya 'true', state awal adalah true.
  //    Jika tidak, state awal adalah false.
  const [sudahLogin, setSudahLogin] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // 2. Fungsi untuk menangani proses login
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true'); // Simpan status ke localStorage
    setSudahLogin(true); // Perbarui state
  };

  // 3. Fungsi untuk menangani proses logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Hapus status dari localStorage
    setSudahLogin(false); // Perbarui state
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      {/* 4. Gunakan operator ternary untuk menampilkan UI yang berbeda */}
      {sudahLogin ? (
        <>
          <h2>Selamat Datang Kembali!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Anda belum login. Silakan login.</h2>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default TombolAuth;