import React, { useState } from 'react'
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { connect } from 'react-redux'
import { changeSticker, addSticker } from '../../store/actions/stickers'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { storage } from '../../firebase'
import './StickerForm.css'



const validationSchema = yup.object().shape({
    title: yup.string().required('Обязательное поле!').min(20, 'Минимум 20 символов!').max(60, 'Максимум 60 символов!'),
    description: yup.string().max(200, 'Максимум 200 символов!'),
    cost: yup.number().required('Обязательное поле!').min(1, 'Минимум 1 грн!').max(99999999.99, 'Максимум 99999999.99 грн!'),
    discount: yup.number().integer('Должно быть целое число!').min(10, 'Минимум 10%!').max(90, 'Максимум 90%!'),
    discountTo: yup.date().min(new Date(), 'Должна быть больше текущей даты!'),
});

function StickerForm({changeSticker, addSticker}) {

    const {push} = useHistory();
    const {id} = useParams();

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [disabledSubmit, setDisabledSubmit] = useState(false);
    const [fileError, setFileError] = useState('');

    function handleChange(target){
        if (target.files[0].type === 'image/jpeg' || target.files[0].type === 'image/png'){
            setDisabledSubmit(false);
            setFileError('');
            setImage(target.files[0]);
        } else {
            setDisabledSubmit(true);
            setFileError('Неверный формат!');
        }
      };

    function getEmptyValues(){
        return {
            title: '',
            description: '',
            cost: '',
            discount: '',
            discountTo: '',
        }
    }

    function onFormikSubmit(values){
        setDisabledSubmit(true);
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on("state_changed",snapshot => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(progress);
            },
            error => {
              console.log(error);
            },
            () => {
              storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    id ? changeSticker(id, url, values) : addSticker(url, values)
                    setDisabledSubmit(false);
                    push('/list');
                });
            }
          );
    }

    function renderTextField({field, meta}){
        return (
            <TextField {...field} error={meta.error && meta.touched ? true : false} helperText={meta.touched ? meta.error : ''} label={"Enter " + (field.name)} variant="outlined" size="small" color="primary"/>
        )
    }

    function renderDateField({field, meta}){
        return (
            <TextField {...field} type="date" error={meta.error && meta.touched ? true : false} helperText={meta.touched ? meta.error : ''} variant="outlined" size="small" color="primary" required/>
        )
    }

    function renderForm({values}){
        return (
            <Form className="sticker-form-main-container">
                <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                    <Grid item>
                        <NavLink to="/list" className="sticker-form-link">На главную</NavLink>
                    </Grid>
                    <Grid item>
                        <progress value={progress} max="100"/>
                        <input name="url" type="file" onChange={(e) => handleChange(e.target)} required/>
                        <p className="errorMsg">{fileError}</p>
                    </Grid>
                    <Grid item>
                        <Field name="title">{renderTextField}</Field>
                    </Grid>
                    <Grid item>
                        <Field name="description">{renderTextField}</Field>
                    </Grid>
                    <Grid item>
                        <Field name="cost">{renderTextField}</Field>
                    </Grid>
                    <Grid item>
                        <Field name="discount">{renderTextField}</Field>
                    </Grid>
                    <Grid item>
                        {!isNaN(values.discount) && values.discount !== '' ?
                        <Field type="date" name="discountTo">{renderDateField}</Field> : ''}
                    </Grid>
                    <Grid item>
                        {id ? <Button type="submit" variant="contained" color="primary" startIcon={<CheckIcon/>} disabled={disabledSubmit}>Edit</Button> :
                        <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon/>} disabled={disabledSubmit}>Add</Button>}
                    </Grid>
                </Grid>
            </Form>
        )
    }

    return (
        <Formik initialValues={getEmptyValues()} onSubmit={onFormikSubmit} validationSchema={validationSchema} enableReinitialize={true}>
            {(initialValues) => renderForm(initialValues)}
        </Formik>
    )
}

const mapDispatchToProps = {
    changeSticker,
    addSticker,
}

export default connect(null, mapDispatchToProps)(StickerForm)