import * as types from './types';

export const processoEmDestaque = processo => (
    {
        type: types.PROCESSO_EM_DESTAQUE,
        payload: processo
    }
)

export const armazenarProcessos = processos => (
    {
        type: types.ARMAZENAR_PROCESSOS,
        payload: processos
    }
)

export const buscarProcessos = q => (
    {
        type: types.BUSCAR_PROCESSOS,
        payload: q
    }
)

export const buscarProcesso = id => (
    { type: types.BUSCAR_PROCESSO, payload: id }
)

export const excluirProcessso = (processo) => {
    return { type: types.EXCLUIR_PROCESSO, payload: processo }
}

export const inserirProcesso = processo => {
    return { type: types.INSERIR_PROCESSO, payload: processo }
}

export const atualizarProcesso = processo => (
    { type: types.ATUALIZAR_PROCESSO, payload: processo }
)

export const limparProcessoAtual = () => (
    { type: types.LIMPAR_PROCESSO_ATUAL }
)
