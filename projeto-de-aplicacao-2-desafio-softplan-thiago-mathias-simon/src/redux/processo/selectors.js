import { PROCESSO_INICIAL } from "../../util/constantes";

export const getProcessoEmDestaque = store => store.processo.processo;
export const getProcessos = store => store.processo.processos;
export const getProcessoAtual = store => store.processo.processoAtual || PROCESSO_INICIAL;