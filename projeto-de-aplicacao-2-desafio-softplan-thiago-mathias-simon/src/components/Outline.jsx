import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImagemDeX from "../assets/img/imagemX.png";
import { processoEmEdicao } from '../redux/processo/actions';
import { getProcessoEmDestaque } from '../redux/processo/selectors';

export default function Outline(props) {
  const { excluir, editar, voltar } = props;

  const dispatch = useDispatch();

  const processos = useSelector(getProcessoEmDestaque);
  console.log('processos', processos)

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
                  <th>Processo</th>
                  <th >Data</th>
                </tr>
              </thead>
              <tbody >
                <tr>
                  <td className="headline" id='processoNumero'>{processos.numero}</td>
                  <td className="headline" id='processoData'>{processos.data}</td>
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
            <th>
              Interessados
                </th>
          </tr>
        </thead>
        <tbody>
          <div id='divInteressados'>

            {
              processos.interessados.map(interessado => {
                return (
                  <tr>
                    <td id='processoInteressados'>
                      {interessado}
                    </td>
                  </tr>
                )
              }
              )
            }
          </div>

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
        onClick={() => {
          excluir()
          voltar()
        }}>REMOVER</button>
      <button className="buttonLabel" id="btnEdit" variant="outlined" color="primary"
        onClick={() => {
          console.log(processos);
          dispatch(processoEmEdicao(processos));
          editar();
        }}>
        EDITAR
         </button>
    </div>
  );
};
