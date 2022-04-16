import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import dateFormat from '../../Utils/dateFormat';

const initialFValues = {
    nameH: 'דעכעדגכ',
    nameE: 'sdffgfs',
    personalId: '123456789',
    bank: '',
    city: '',
    date: new Date(),
    branch: '',
    accountNumber: '4556456'
}

export function useForm(validateOnChange = false) {

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true)
    const [bankValue, setBankValue] = useState(4)

    const contains_heb = (str) => {
        console.log((/[\u0590-\u05FF]/).test(str))
        return (/[\u0590-\u05FF]/).test(str);
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }



        if ('nameH' in fieldValues)
            temp.nameH = !contains_heb(fieldValues.nameH) ? "*This field is required. *Only Hebrew" : "";
        if ('nameE' in fieldValues)
            temp.nameE = fieldValues.nameE || fieldValues.nameE.length > 16 ? "" : "*This field is required. *Only English";
        if ('date' in fieldValues)
            temp.date = fieldValues.date !== '$' ? "" : "This field is required.";
        if ('personalId' in fieldValues)
            temp.personalId = fieldValues.personalId.length !== 9 ? "*This field is required. *Nine Numbers Only." : "";
        if ('bank' in fieldValues)
            temp.bank = fieldValues.bank ? "" : "This field is required.";
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required.";
        if ('branch' in fieldValues)
            temp.branch = fieldValues.branch ? "" : "This field is required.";
        if ('accountNumber' in fieldValues)
            temp.accountNumber = fieldValues.accountNumber ? "" : "This field is required.";

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        // console.log(value)
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }


    const handleBankSelection = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })

        setDisabled(false)
        setBankValue(value)
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    const setNewRow = async (newRow) => {
        const dateAfterConversion = dateFormat(newRow.date)
        const newRowData = {
            "nameH": newRow.nameH,
            "nameE": newRow.nameE,
            "birthDate": dateAfterConversion,
            "personalId": +newRow.personalId,
            "city": 'newRow.city',
            "bank": 'newRow.bank',
            "branch": newRow.branch,
            "accountNumber": +newRow.accountNumber,
        }
        const data = JSON.stringify(newRowData);

        const config = {
            method: 'post',
            url: 'https://localhost:7155/api/UserList',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        setNewRow,
        validate,
        disabled,
        handleBankSelection,
        bankValue
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}