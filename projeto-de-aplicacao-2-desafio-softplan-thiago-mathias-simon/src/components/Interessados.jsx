import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProcessoEmEdicao } from '../redux/processo/selectors';
import { TextField, InputLabel, FormHelperText, Button } from '@material-ui/core';

const Interessados = props => {

  const { interessados, adicionarInteressado, setInteressados } = props;

  const [interessado, setInteressado] = useState('');

  const processoEmEdicao = useSelector(getProcessoEmEdicao);

  useEffect(() => {
    setInteressados([]);
  }, []);

  const handleAdicionarInteressado = () => {
    adicionarInteressado(interessado || processoEmEdicao);
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
      <Button id="btnAdd" type='button' className="buttonLabel" variant="contained" color="default"
        onClick={() => { handleAdicionarInteressado() }}>ADICIONAR</Button>
    </>
  )
}

export default Interessados;