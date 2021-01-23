import * as yup from 'yup';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import Interessados from '../components/Interessados';
import { Dialog, TextField, DialogActions, DialogTitle, DialogContent, Button } from '@material-ui/core';

export default function FormDialog(props) {
  const { estado, salvar, handleClose, processo } = props;

  const adicionarInteressado = (interessado, name, values, setFieldValue) => {
    const interessados = values[name];
    console.log(interessados)
    interessados.push(interessado);
    console.log(interessados)
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
    console.log("values", values);
    salvar(values);
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
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span className="title" id="dialogTitle">Cadastro de processo</span>
          <button id="btnClose" onClick={handleClose}>X</button>
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
              handleClose()
            }}
            render={({ values, errors, touched, setFieldTouched, setFieldValue, isSubmitting, handleReset }) => (
              <Form>
                {console.log(values)}
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
                  interessados={values.interessados}
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
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

    </div >
  );
}
