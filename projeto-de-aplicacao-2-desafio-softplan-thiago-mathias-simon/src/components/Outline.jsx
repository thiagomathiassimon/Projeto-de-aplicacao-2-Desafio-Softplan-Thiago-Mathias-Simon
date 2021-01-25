import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImagemDeX from "../assets/img/imagemX.png";
import { processoEmEdicao } from '../redux/processo/actions';
import { getProcessoEmDestaque } from '../redux/processo/selectors';

export default function Outline(props) {

  const { excluir, editar, voltar } = props;

  const processos = useSelector(getProcessoEmDestaque);

  const dispatch = useDispatch();

  return (
    <div className="outline">
      <img className="noneImg" id='expandImage' src={ImagemDeX} alt="Imagem vazia" />
      <table className="tableItem" id="firstTableItem">
        <thead />
        <tbody>
          <tr>
            <table className="tableItem" id="nextTableItem">
              <thead>
                <tr>
                  <th className='thSmall' >Processo</th>
                  <th className='thSmall'>Data</th>
                </tr>
              </thead>
              <tbody >
                <tr>
                  <td className="headline" id='processoNumero'>{processos.numero}</td>
                  <td className="headline" id='processoData'>{processos.entrada}</td>
                </tr>
              </tbody>
            </table>
          </tr>
          <tr>
            <table className="tableItem" id="nextTableItem">
              <thead>
                <tr>
                  <th className='thSmall'>Assunto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="headline" id='processoAssunto'><textarea id="assuntoTextArea" className='headline'>{processos.assunto}</textarea></td>
                </tr>
              </tbody>
            </table>
          </tr>
        </tbody>
      </table>
      <table className="tableItem" id="nextTableItem">
        <thead>
          <tr>
            <th className='thSmall'>
              Interessados
                </th>
          </tr>
        </thead>
        <tbody>
          <div id='divInteressados'>
            {processos.interessados.map(interessado => {
              return (
                <tr>
                  <td id='processoInteressados' className='headline'>
                    {interessado}
                  </td>
                </tr>
              )
            })}
          </div>
        </tbody>
      </table>
      <br />
      <table className="tableItem" id="nextTableItem">
        <thead>
          <tr>
            <th className='thSmall'>
              Descrcição
            </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <p className='headline'>{processos.descricao}</p>
      <button className="buttonLabel" id="btnRemove" variant="outlined"
        onClick={() => {
          const confirmar = window.confirm("Esse processo será excluido. Deseja continuar?")
          if (confirmar) {
            excluir()
            voltar()
          } else {
            window.alert("O processo será mantido!")
          }
        }}>REMOVER</button>
      <button className="buttonLabel" id="btnEdit" variant="outlined" color="primary"
        onClick={() => {
          console.log(processos);
          dispatch(processoEmEdicao(processos));
          editar();
        }}>EDITAR</button>
    </div>
  );
};
