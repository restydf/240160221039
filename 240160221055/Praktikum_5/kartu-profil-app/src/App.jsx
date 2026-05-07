import React from 'react';
import ProfilPengguna from './components/ProfilPengguna';
import Pengumuman from './components/Pengumuman'; 
import TombolAuth from './components/TombolAuth';
import { users } from './data/users';
import './App.css';

function App() {
  return (
    <div className="app-container">

      <h1>Aplikasi Demo React</h1>

      {/* SECTION AUTH */}
      <section style={{ marginBottom: '30px' }}>
        <TombolAuth />
      </section>

      <hr style={{ width: '100%', margin: '40px 0', border: '1px solid #eee' }} />

      {/* SECTION PENGUMUMAN */}
      <Pengumuman 
        judul="Info Praktikum"
        isi="Pastikan semua tugas dikumpulkan sebelum batas waktu yang ditentukan."
      />

      <hr style={{ width: '100%', margin: '40px 0', border: '1px solid #eee' }} />

      {/* SECTION TIM */}
      <h1>Tim Kami</h1>

      <div className="profil-list">
        {users.map(user => (
          <ProfilPengguna
            key={user.id}
            nama={user.nama}
            pekerjaan={user.pekerjaan}
            gambar={user.gambar}
          />
        ))}
      </div>

    </div>
  );
}

export default App;