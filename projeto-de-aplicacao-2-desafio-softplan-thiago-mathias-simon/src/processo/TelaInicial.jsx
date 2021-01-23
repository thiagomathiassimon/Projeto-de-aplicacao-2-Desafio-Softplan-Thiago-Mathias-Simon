import React from 'react';
import SearchBar from '../components/SearchBar'
import Dialog from '../components/Dialog'

export default function TelaInicial(props) {

  const { handleClick, processo, salvar, estado, handleClose, handleClickOpen } = props;

  return (
    <>
      <h1 className="headline" id="pageTitle">Busca de processos</h1>
      <div id="divPesquisa">
        <SearchBar handleClick={handleClick} filtrarDados={() => console.log("Filtrando")} />
      </div>
      <div id="linkLabel">Você pode criar um novo processo <span className="buttonLabel" id="link" onClick={handleClickOpen} >clicando aqui
      </span>.
      </div>
      <Dialog processo={processo} estado={estado} handleClose={handleClose} salvar={salvar} />
    </>
  )

}