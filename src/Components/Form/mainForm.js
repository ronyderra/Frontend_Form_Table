import React from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../Controls/controls";
import { useForm, Form } from './useForm';
import { Link } from "react-router-dom";
import { Container } from '@mui/material';

export default function MainForm() {

    const { disabled, bankValue, handleBankSelection, setNewRow, validate, values,
        errors, handleInputChange, resetForm } = useForm(true);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setNewRow(values)
            resetForm()
        }
    }

    return (
        <Container maxWidth="lg">
            <Form onSubmit={handleSubmit}>
                <Grid container >
                    <Grid item xs={12} sm={6}>
                        <Controls.Input
                            label="Name In Hebrew"
                            name="nameH"
                            value={values.nameH}
                            onChange={handleInputChange}
                            error={errors.nameH}
                            direction={"rtl"}
                            type={'string'}
                        />
                        <Controls.Input
                            label="Name In English"
                            name="nameE"
                            value={values.nameE}
                            onChange={handleInputChange}
                            error={errors.nameE}
                            type={'string'}
                        />
                        <Controls.DatePicker
                            name="date"
                            label="Birth Date"
                            value={values.date}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            label="Personal Id"
                            name="personalId"
                            value={values.personalId}
                            onChange={handleInputChange}
                            error={errors.personalId}
                            type={'number'}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controls.Select
                            name="city"
                            label="City"
                            value={values.city}
                            onChange={handleInputChange}
                            error={errors.city}
                        />
                        <Controls.Select
                            name="bank"
                            label="Bank"
                            value={values.bank}
                            onChange={handleBankSelection}
                            error={errors.bank}
                        />
                        <Controls.Select
                            name="branch"
                            label="Branch"
                            value={values.branch}
                            onChange={handleInputChange}
                            error={errors.branch}
                            boolien={disabled}
                            bankNumber={bankValue}
                        />
                        <Controls.Input
                            label="Account Number"
                            name="accountNumber"
                            value={values.accountNumber}
                            onChange={handleInputChange}
                            error={errors.accountNumber}
                            type={'number'}
                        />
                        <br />
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                        <Link to="/table" style={{ textDecoration: 'none' }}>
                            <Controls.Button
                                text="View Table"
                                color="default" />
                        </Link>
                    </Grid>
                </Grid>
            </Form>
        </Container>
    )
}