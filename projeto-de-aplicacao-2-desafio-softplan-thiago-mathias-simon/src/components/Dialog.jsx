import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react';
import Interessados from '../components/Interessados';
import { useSelector, useDispatch } from 'react-redux';
import { processoEmEdicao } from '../redux/processo/actions';
import { getProcessoEmEdicao } from '../redux/processo/selectors';
import { Dialog, TextField, DialogActions, DialogTitle, DialogContent, Button } from '@material-ui/core';

export default function FormDialog(props) {

  const { estado, salvar, handleClose, voltar } = props;

  const processo = useSelector(getProcessoEmEdicao);

  const [interessados, setInteressados] = useState([]);

  const listaInteressados = () => {
    if (processo) {
      processo.interessados.map(interessado => interessados.push(interessado))
    }
  }

  const dispatch = useDispatch();

  const adicionarInteressado = (interessado, name, values, setFieldValue) => {
    interessados.push(interessado);
    setFieldValue(name, interessados);
  }

  const PROCESSO_INICIAL = {
    assunto: "",
    interessados: [],
    descricao: ""
  }

  const ProcessoSchema = yup.object().shape({
    assunto: yup.string().required('Informe o assunto do processo.'),
    interessados: yup.array().required('Informe os interessados do processo.'),
    descricao: yup.string().required('Informe a descrição do processo.')
  });

  const salvarProcesso = (values, actions) => {
    salvar(values);
    console.log("values", values);

    console.log(actions)
    actions.resetForm();
  }

  const handleChange = (name, value, setFieldValue) => {
    setFieldValue(name, value);
  }

  return (
    <div id="background" >
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={estado}
        onClose={() => {
          dispatch(processoEmEdicao(PROCESSO_INICIAL));
          handleClose()
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span className="title" id="dialogTitle">Cadastro de processo</span>
          <button id="btnClose" onClick={() => {
            console.log(PROCESSO_INICIAL);
            dispatch(processoEmEdicao(PROCESSO_INICIAL));
            handleClose();
          }}>X</button>
        </DialogTitle>
        <DialogContent >
          <Formik
            enableReinitialize
            validateOnMount={true}
            validationSchema={ProcessoSchema}
            initialValues={processo || PROCESSO_INICIAL}
            onSubmit={(values, actions) => {
              console.log('Ativando o onSubmit')
              salvarProcesso(values, actions)
              dispatch(processoEmEdicao(PROCESSO_INICIAL));
              handleClose()
              voltar()
            }}
            render={({ values, errors, touched, setFieldTouched, setFieldValue, isSubmitting, handleReset }) => (
              <Form>
                <Field
                  component={TextField}
                  size="small"
                  label="Assunto"
                  name="assunto"
                  value={values.assunto}
                  onFocus={() => setFieldTouched('assunto')}
                  onChange={e => handleChange('assunto', e.target.value, setFieldValue)}
                  error={touched.assunto && errors.assunto}
                  helperText={touched.assunto && errors.assunto}
                />
                <br />
                <Field
                  component={Interessados}
                  fullWidth
                  size="small"
                  name="interessados"
                  interessados={interessados}
                  setInteressados={setInteressados}
                  adicionarInteressado={interessado => adicionarInteressado(interessado, 'interessados', values, setFieldValue)}
                  onChange={e => handleChange('interessados', e.target.value, setFieldValue, setFieldTouched)}
                  onFocus={() => setFieldTouched('interessados')}
                  error={touched.interessados && errors.interessados}
                  helperText={touched.interessados && errors.interessados}
                />
                <br />
                <Field
                  component={TextField}
                  fullWidth
                  multiline
                  rowsMax={6}
                  size="small"
                  label="Descrição"
                  name="descricao"
                  value={values.descricao}
                  onFocus={() => setFieldTouched('descricao')}
                  onChange={e => handleChange('descricao', e.target.value, setFieldValue)}
                  error={touched.descricao && errors.descricao}
                  helperText={touched.descricao && errors.descricao}
                />
                <br />
                <br />
                <Button id="btnSalvar" variant="contained" color="primary" type="submit" disabled={isSubmitting} >SALVAR</Button>
              </Form>
            )}
          />
          {listaInteressados()}
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div >
  );
}
