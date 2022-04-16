import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
// import axios from "axios";

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
            temp.nameH =  !contains_heb(fieldValues.nameH) ? "*This field is required. *Only Hebrew" : "";
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
        console.log(newRow)
        // const date = newRow.date.toLocaleTimeString(["he-US"], {
        //     month: 'numeric',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // });

        // const response = await axios.get("https://xnesdeskserver.herokuapp.com/api/users/accountNumber", { params: { accountNumber: newRow.accountNumber } })
        // if (response.data.length === 0) {
        //     alert('no data founf')
        //     return
        // }
        // const newRowData = {
        //     "submitter": newRow.submitter,
        //     "action": newRow.action,
        //     "amount": newRow.amount,
        //     "accountNumber": newRow.accountNumber,
        //     "date": date,
        //     "currency": newRow.currency,
        //     "platform": newRow.platform,
        //     "reason": newRow.reason,
        //     "fullName": response.data[0].fullName,
        //     "unumber": response.data[0].unumber,
        //     "sheled": response.data[0].sheled,
        //     "status": "pending"

        // }
        // const postingResponse = await axios.post("https://xnesdeskserver.herokuapp.com/api/buyingPowerList", { mode: 'cors', newRowData })
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