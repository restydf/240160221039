import React from 'react';
import ProfilPengguna from './components/ProfilPengguna';
import Pengumuman from './components/Pengumuman'; // <-- Impor komponen baru
import { users } from './data/users'; // Impor data pengguna
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <h1>Tim Kami</h1>
      <div className="profil-list">
        {users.map(user => (
          <ProfilPengguna
            key={user.id} // Prop `key` esensial untuk optimasi render list
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