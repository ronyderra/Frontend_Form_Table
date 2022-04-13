import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
import axios from "axios";


export function useForm(validateOnChange = false) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nameH' in fieldValues)
            temp.nameH = fieldValues.nameH.length > 21 || !contains_heb(fieldValues.nameH) ? "This field is required." : ""
        if ('nameE' in fieldValues)
            temp.nameE = fieldValues.nameE ? "" : "This field is required."
        if ('date' in fieldValues)
            temp.date = fieldValues.date !== '$' ? "" : "This field is required."
        if ('personalId' in fieldValues)
            temp.personalId = fieldValues.personalId.length !== 9 ? "account number is too long" : ""
        if ('bank' in fieldValues)
            temp.bank = fieldValues.bank ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
        if ('branch' in fieldValues)
            temp.branch = fieldValues.branch ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const contains_heb = (str)=> {
        console.log((/[\u0590-\u05FF]/).test(str))
        return (/[\u0590-\u05FF]/).test(str);
    }

    const initialFValues = {
        nameH: '',
        nameE: 'GAL',
        personalId: '313287341',
        bank: '',
        city: '',
        date: new Date(),
        branch: '',
    }

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {


        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
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
        validate
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
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