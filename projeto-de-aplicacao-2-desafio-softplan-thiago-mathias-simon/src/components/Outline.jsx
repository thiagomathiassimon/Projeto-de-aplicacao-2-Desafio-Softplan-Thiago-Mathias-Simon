import * as React from 'react';
import '../assets/css/Outline.css';
import { useSelector } from 'react-redux';
import ImagemDeX from "../assets/img/imagemX.png";
import { getProcessoEmDestaque } from '../redux/processo/selectors';

export default function Outline(props) {
  const { excluir, editar } = props;

  const processos = useSelector(getProcessoEmDestaque);
  console.log('processos', processos)

  return (
    <div className="outline">
      <img className="noneImg" src={ImagemDeX} alt="Imagem vazia" />
      <table className="tableItem" id="firstTableItem">
        <thead />
        <tbody>
          <tr>
            <table className="tableItem" id="nextTableItem">
              <thead>
                <tr>
                  <th>Processo</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody >
                <tr>
                  <td className="headline">{processos.numero}</td>
                  <td className="headline" >{processos.data}</td>
                </tr>
              </tbody>
            </table>
          </tr>
          <tr>
            <table className="tableItem" id="nextTableItem">
              <thead>
                <tr>
                  <th>Assunto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="headline" >{processos.assunto}</td>
                </tr>
              </tbody>
            </table>
          </tr>
        </tbody>
      </table>
      <table className="tableItem" id="nextTableItem">
        <thead>
          <tr>
            <th>
              Interessados
                </th>
          </tr>
        </thead>
        <tbody>
          {
            processos.interessados.map(interessado => {
              return (
                <tr>
                  <td>{interessado}</td>
                </tr>
              )
            }
            )
          }
        </tbody>
      </table>
      <br />
      <table className="tableItem" id="nextTableItem">
        <thead>
          <tr>
            <th>
              Descrcição
                </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <p>{processos.descricao}</p>
      <button className="buttonLabel" id="btnRemove" variant="outlined"
        onClick={excluir}>REMOVER</button>
      <button className="buttonLabel" id="btnEdit" variant="outlined" color="primary"
        onClick={editar}>
        EDITAR
         </button>
    </div>
  );
};
