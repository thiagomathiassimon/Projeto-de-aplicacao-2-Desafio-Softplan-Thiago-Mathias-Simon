import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as types from './types';
import ProcessoAPI from '../../services/processos';

function* buscarProcessos(action) {
    const processo = yield call(ProcessoAPI.buscarProcessos, action.payload);
    yield put({ type: types.ARMAZENAR_PROCESSOS, payload: processo });
}

function* buscarProcesso(action) {
    const processo = yield call(ProcessoAPI.buscarProcesso, action.payload);
    yield put({ type: types.SETAR_PROCESSO_ATUAL, payload: processo });
}

function* excluirProcessso(action) {
    yield call(ProcessoAPI.excluirProcesso, action.payload.id);
    yield put({ type: types.BUSCAR_PROCESSOS });
}

function* insertProcesso(action) {
    yield call(ProcessoAPI.inserirProcesso, action.payload);
}

function* atualizarProcesso(action) {
    yield call(ProcessoAPI.atualizarProcesso, action.payload);
}


function* watchBuscarProcessos() {
    yield takeEvery(types.BUSCAR_PROCESSOS, buscarProcessos);
}

function* watchBuscarProcesso() {
    yield takeEvery(types.BUSCAR_PROCESSO, buscarProcesso);
}

function* watchExcluirProcesso() {
    yield takeEvery(types.EXCLUIR_PROCESSO, excluirProcessso);
}

function* watchInserirProcesso() {
    yield takeEvery(types.INSERIR_PROCESSO, insertProcesso);
}

function* watchAtualizarProcesso() {
    yield takeEvery(types.ATUALIZAR_PROCESSO, atualizarProcesso);
}

export default function* rootSaga() {
    yield all([
        watchBuscarProcessos(),
        watchBuscarProcesso(),
        watchExcluirProcesso(),
        watchInserirProcesso(),
        watchAtualizarProcesso(),
    ])
}