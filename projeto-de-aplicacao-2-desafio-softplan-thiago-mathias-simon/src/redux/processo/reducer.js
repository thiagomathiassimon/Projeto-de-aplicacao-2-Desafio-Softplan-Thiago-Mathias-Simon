import * as types from './types';

const INITIAL_STATE = {}

const ProcessoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case types.PROCESSO_EM_DESTAQUE:
            return { ...state, processo: action.payload };

        case types.PROCESSO_EM_EDICAO:
            return { ...state, processoEmEdicao: action.payload };

        case types.ARMAZENAR_PROCESSOS:
            return { ...state, processos: action.payload };

        case types.SETAR_PROCESSO_ATUAL:
            return { ...state, processoAtual: action.payload }

        default:
            return state;
    }
}

export default ProcessoReducer;