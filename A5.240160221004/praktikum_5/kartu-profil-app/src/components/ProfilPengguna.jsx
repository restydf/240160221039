import React from 'react';
import Card from './Card'; // Impor komponen Card
import './ProfilPengguna.css'; // Impor dependensi styling

function ProfilPengguna({ gambar, nama, pekerjaan }) {
  return (
    <div className="kartu-profil">
      <img src={gambar} alt={"Foto " + nama} />
      <h3>{nama}</h3>
      <p>{pekerjaan}</p>
    </div>
  );
}

export default ProfilPengguna;