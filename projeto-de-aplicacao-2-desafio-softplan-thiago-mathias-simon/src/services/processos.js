import axios from 'axios';
import * as baseendpoints from './baseendpoints';

const BASE_URL = `${baseendpoints.PROCESSO_API}/processo`;

class ProcessoService {

  buscarProcessos(q) {
    console.log(q)
    const url = q ? `${BASE_URL}?q=${q}` : BASE_URL;
    return axios.get(url)
      .then(response => {
        console.log('buscarProcessos(q)')
        return response.data
      })
      .catch(error => { throw error });
  }

  buscarProcesso(id) {
    console.log('id', id)
    const url = id ? `${BASE_URL}/${id}` : BASE_URL;
    return axios.get(url)
      .then(response => {
        console.log('buscarProcesso(id)')
        return response.data
      })
      .catch(error => { throw error });
  }

  inserirProcesso(processo) {
    return axios.post(BASE_URL, processo)
      .then(response => console.log('response', response.data))
      .catch(error => { throw error });
  }

  atualizarProcesso(processo) {
    return axios.put(BASE_URL, processo)
      .catch(error => { throw error });
  }

  excluirProcesso(id) {
    return axios.delete(`${BASE_URL}/${id}`)
      .catch(error => { throw error });
  }
}

export default new ProcessoService();