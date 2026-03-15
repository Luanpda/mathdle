import React from 'react';

export default function Header({diasDeJogo}) {
  return (
    <div className="title-container">
      <h1 className="mathdle-title">
        Mathdle <span className="beta-tag">Beta</span>
      </h1>
      <p className="day-text">Day {diasDeJogo}</p>
    </div>
  );
}