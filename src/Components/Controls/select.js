import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import axios from 'axios'

export default function Select(props) {
    const [data, setData] = useState([{}])
    const { name, label, value, error = null, onChange, options, boolien, bankNumber } = props;

    useEffect(() => {
        const getData = async () => {
            const dataResponse = await axios.get('https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation')
            switch (options) {
                case 'cities':
                    const tenCities = dataResponse.data.Data.Cities.slice(0, 10);
                    setData(tenCities);
                    break;
                case 'banks':
                    const banks = dataResponse.data.Data.Banks;
                    setData(banks);
                    break;
                case 'branch':
                    const relaventBranches = dataResponse.data.Data.BankBranches.filter((i => i.BranchNumber === bankNumber));
                    const relaventBranchesNames = relaventBranches.map(i => i.BranchName);
                    setData(relaventBranchesNames);
                    break;
                default:
                    return;
            }
        }
        getData()
    }, [boolien, bankNumber])

    return (
        <FormControl variant="outlined" disabled={boolien}
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem dir='rtl' value="">None</MenuItem>
                {
                    data && data.map(
                        (item, key) => (<MenuItem dir='rtl' key={key} value={item.Code || item.BranchNumber || item}>{item.Description || item.BranchNumber || item}</MenuItem>)
                    )

                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}