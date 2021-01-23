import { processos } from '../util/constantes';
import { createServer, Model } from 'miragejs';
import * as baseendpoints from './baseendpoints';

let contador = processos.length;

const gerarData = () => {
  const data = new Date();
  if (data.getMonth() + 1 < 10) {
    return `${data.getDate()}/0${data.getMonth() + 1}/${data.getFullYear()}`
  } else {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }
}

const gerarNumero = () => {
  const data = new Date();
  const ultimo = contador;
  console.log(ultimo)
  contador += 1;
  console.log(contador)
  if (ultimo < 9) {
    return `SOFT 000${ultimo + 1}/${data.getFullYear()}`
  } else if (ultimo < 99) {
    return `SOFT 00${ultimo + 1}/${data.getFullYear()}`
  } else if (ultimo < 999) {
    return `SOFT 0${ultimo + 1}/${data.getFullYear()}`
  } else {
    return `SOFT ${ultimo + 1}/${data.getFullYear()}`
  }
}

export function criarServidor({ environment = "test" } = {}) {
  const server = createServer({
    environment,
    models: {
      processo: Model,
    },

    seeds(server) {
      processos.forEach(processo => server.create("processo", processo))
    },

    routes() {
      this.namespace = baseendpoints.PROCESSO_API;

      this.get("/processo", (schema, request) => {
        const q = request.queryParams.q;
        console.log("q", q)
        if (q) {
          console.log('requisição de busca com parâmetros')
          return schema.processos.where(processo => processo.numero.includes(q) || processo.assunto.includes(q) || processo.interessados.includes(q) || processo.descricao.includes(q)).models
        }
        console.log('schema', schema)
        return schema.processos.all().models;
      });

      this.get("/processo/:id", (schema, request) => {
        const id = request.params.id;
        return schema.processos.find(id).attrs;
      });

      this.post("/processo", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        attrs.data = gerarData();
        attrs.numero = gerarNumero();
        attrs.id = contador;
        console.log('attrs', attrs)
        return schema.processos.create(attrs);
      });

      this.put("/processo", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.processos.create(attrs);
      });

      this.delete("/processo/:id", (schema, request) => {
        const id = request.params.id;
        return schema.processos.find(id).destroy();
      });
    },
  });
  return server;
}