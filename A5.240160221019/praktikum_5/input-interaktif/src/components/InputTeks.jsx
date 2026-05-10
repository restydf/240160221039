import React, { useState } from 'react';
import './InputTeks.css';

function InputTeks() {
  // 1. Deklarasikan state untuk menyimpan nilai input. Nilai awalnya adalah string kosong.
  const [teks, setTeks] = useState('');

  // 2. Event handler yang akan dipanggil setiap kali ada perubahan pada input.
  //    'event.target.value' berisi teks terbaru dari elemen input.
  function handleChange(event) {
    setTeks(event.target.value);
  }

  return (
    <div className="input-container">
      <input
        type="text"
        value={teks} // 3. Hubungkan nilai input dengan state 'teks'
        onChange={handleChange} // 4. Panggil handleChange saat input berubah
        placeholder="Ketik sesuatu..."
      />
      <p className="display-teks">
        Anda mengetik: <strong>{teks}</strong>
      </p>
    </div>
  );
}

export default InputTeks;