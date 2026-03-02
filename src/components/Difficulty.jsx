import React from 'react';

export default function Difficulty() {
  return (
    <div className="difficulty-row">
      <button className="diff-btn active">Easy</button>
      <button className="diff-btn">Medium</button>
      <button className="diff-btn">Hard</button>
    </div>
  );
}