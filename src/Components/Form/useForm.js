import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import dateFormat from '../../Utils/DateFormat';
import { Contains_heb, Contains_eng, ContainsNumber, ContainsSpecialChars, ErrorString } from '../../Utils/Validation'

const initialFValues = {
    nameH: '',
    nameE: '',
    personalId: '',
    bank: '',
    city: '',
    date: new Date(),
    branch: '',
    accountNumber: ''
}

export const UseForm = (validateOnChange = false) => {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true)
    const [bankValue, setBankValue] = useState(4)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nameH' in fieldValues)
            temp.nameH = fieldValues.nameH.length > 20 || !Contains_heb(fieldValues.nameH) || ContainsNumber(fieldValues.nameH) || ContainsSpecialChars(fieldValues.nameH) ? ErrorString('Hebrew', 20) : "";
        if ('nameE' in fieldValues)
            temp.nameE = fieldValues.nameE.length > 15 || !Contains_eng(fieldValues.nameE) || ContainsNumber(fieldValues.nameE) || ContainsSpecialChars(fieldValues.nameE) ? ErrorString('English', 15) : "";
        if ('date' in fieldValues)
            temp.date = fieldValues.date ? "" : "This field is required.";
        if ('personalId' in fieldValues)
            temp.personalId = fieldValues.personalId.length !== 9 ? "*This field is required. *Nine Numbers Only." : "";
        if ('bank' in fieldValues)
            temp.bank = fieldValues.bank ? "" : "This field is required.";
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required.";
        if ('branch' in fieldValues)
            temp.branch = fieldValues.branch ? "" : "This field is required.";
        if ('accountNumber' in fieldValues)
            temp.accountNumber = !fieldValues.accountNumber || fieldValues.accountNumber.length > 10 ? "This field is required. *10 Numbers Max" : '';

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const handleBankSelection = (e) => {
        e.preventDefault();
        const { value } = e.target
        setValues({
            ...values,
            bank: value.des
        })
        if (validateOnChange)
            validate({ bank: value.des })

        setDisabled(false)
        setBankValue(value.code)
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
            "city": newRow.city,
            "bank": newRow.bank,
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
                alert('User Added!')
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
            width: '88%',
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