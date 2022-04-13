import React from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../Controls/controls";
import { useForm, Form } from './useForm';

export default function MainForm() {

    const { setNewRow, validate, values, errors, handleInputChange, resetForm } = useForm(true);


    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setNewRow(values)
            resetForm()
        }
    }

    return (
        <div>
            <Form>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Select
                            name="submitter"
                            label="Submitter"
                            value={values.Description}
                            onChange={handleInputChange}
                            options={'cities'}
                            error={errors.submitter}
                        />
                        <Controls.DatePicker
                            name="date"
                            label="Date"
                            value={values.date}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            label="Amount"
                            name="amount"
                            value={values.amount}
                            onChange={handleInputChange}
                            error={errors.amount}
                        />
                    </Grid>
                </Grid>
            </Form>
        </div>
    )
}