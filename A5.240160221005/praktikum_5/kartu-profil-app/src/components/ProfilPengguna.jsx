import React from 'react';
import Card from './Card'; // Impor komponen Card
import './ProfilPengguna.css';

function ProfilPengguna({ gambar, nama, pekerjaan }) {
  // Gunakan Card sebagai pembungkus
  return (
    <Card>
      <img src={gambar} alt={"Foto " + nama} />
      <h3>{nama}</h3>
      <p>{pekerjaan}</p>
    </Card>
  );
}

export default ProfilPengguna;