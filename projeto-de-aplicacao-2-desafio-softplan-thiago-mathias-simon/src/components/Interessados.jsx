import { TextField, InputLabel, FormHelperText, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const Interessados = props => {
  const { interessados, adicionarInteressado, setInteressados } = props;
  const [interessado, setInteressado] = useState('');

  useEffect(() => {
    setInteressados([]);
  }, []);

  const handleAdicionarInteressado = () => {
    adicionarInteressado(interessado);
    resetarDadosInteressado();
  }

  const resetarDadosInteressado = () => {
    setInteressado('');
  }

  return (
    <>
      <FormHelperText>Interessados</FormHelperText>
      <div id="listaInteressados">
        {interessados && interessados.length > 0 &&
          interessados.map((interessado, indice) =>
            <InputLabel key={`${indice}/${interessado}`}>{`${interessado}`}</InputLabel>
          )}
      </div>
      <br />
      <TextField
        label="Interessados"
        value={interessado}
        onChange={e => setInteressado(e.target.value)}
        size="small" />
      <Button id="btnAdd" type='button' className="buttonLabel" variant="contained" color="default" onClick={() => { handleAdicionarInteressado() }}>ADICIONAR</Button>
    </>
  )
}

export default Interessados;