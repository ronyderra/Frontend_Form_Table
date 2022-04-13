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
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input
                            label="Name In Hebrew"
                            name="nameH"
                            value={values.nameH}
                            onChange={handleInputChange}
                            error={errors.nameH}
                        />
                        <Controls.Input
                            label="Name In English"
                            name="nameE"
                            value={values.nameE}
                            onChange={handleInputChange}
                            error={errors.nameE}
                        />
                        <Controls.DatePicker
                            name="date"
                            label="Date"
                            value={values.date}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Input
                            label="Personal Id"
                            name="personalId"
                            value={values.personalId}
                            onChange={handleInputChange}
                            error={errors.personalId}
                        />
                        <Controls.Select
                            name="city"
                            label="City"
                            value={values.city}
                            onChange={handleInputChange}
                            options={'cities'}
                            error={errors.city}
                        />
                        <Controls.Select
                            name="bank"
                            label="Bank"
                            value={values.bank}
                            onChange={handleInputChange}
                            options={'banks'}
                            error={errors.bank}
                        />
                        <Controls.Select
                            name="branch"
                            label="Branch"
                            value={values.branch}
                            onChange={handleInputChange}
                            options={'branch'}
                            error={errors.branch}
                        />
                        <br />
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </Grid>
                </Grid>
            </Form>
        </div>
    )
}