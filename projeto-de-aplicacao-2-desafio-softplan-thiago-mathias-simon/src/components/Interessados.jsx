import { TextField, InputLabel, FormHelperText, Button } from '@material-ui/core';
import React, { useState } from 'react';

const Interessados = props => {
  const { interessados, adicionarInteressado } = props;
  const [interessado, setInteressado] = useState('');

  const handleAdicionarInteressado = () => {
    const dadosInteressado = [
      interessado
    ]
    adicionarInteressado(dadosInteressado);
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
          interessados.map(interessado =>
            <InputLabel key={interessado}>{`${interessado}`}</InputLabel>
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