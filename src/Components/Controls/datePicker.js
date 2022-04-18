import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

export default function DatePicker(props) {
    const { name, label, value, onChange } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value

        }
    })

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    name={name}
                    label={label}
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={date => onChange(convertToDefEventPara(name, date))}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </>
    )
}