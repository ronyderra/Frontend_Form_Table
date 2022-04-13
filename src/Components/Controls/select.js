import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import axios from 'axios'

export default function Select(props) {
    const [data, setData] = useState([{}])
    const { name, label, value, error = null, onChange, options } = props;

    useEffect(() => {
        const getData = async () => {
            switch (options) {
                case 'cities':
                    const resCities = await axios.get('https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation')
                    const tenCities = resCities.data.Data.Cities.slice(0, 10)
                    setData(tenCities)
                    break;
                case 'banks':
                    const resBanks = await axios.get('https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation')
                    setData(resBanks)
                    break;
                case 'branch':
                    const resBranch = await axios.get('https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation')
                    setData(resBranch)
                    break;
                default:
                    return;
            }
        }
        getData()
    }, [])

    return (
        <FormControl variant="outlined"
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    data && data.map(
                        (item, key) => (<MenuItem key={key} value={item.id}>{item.Description}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}