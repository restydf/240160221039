import React from 'react';
import './Card.css';

// Komponen menerima `children` sebagai prop spesial
function Card({ children }) {
  // `children` akan berisi JSX apapun yang disisipkan di antara tag <Card> dan </Card>
  return (
    <div className="card-wrapper">
      {children}
    </div>
  );
}

export default Card;