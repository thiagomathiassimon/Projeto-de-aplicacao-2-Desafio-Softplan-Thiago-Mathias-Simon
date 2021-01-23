import React from 'react';

export default function Botao(props) {
  const { handleClick } = props;
  return (
    <button id="btn" onClick={handleClick}>NOVO</button>
  )
}