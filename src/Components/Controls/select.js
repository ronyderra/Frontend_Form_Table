import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, ListItemIcon } from '@material-ui/core';
import axios from 'axios'

export default function Select(props) {
    const [data, setData] = useState([{}])
    const { name, label, value, error = null, onChange, boolien, bankNumber } = props;

    useEffect(() => {
        const getData = async () => {
            const dataResponse = await axios.get('https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation')
            switch (name) {
                case 'city':
                    const tenCities = dataResponse.data.Data.Cities.slice(0, 10);
                    const relaventTenCities = tenCities.map(i => i.Description);
                    setData(relaventTenCities);
                    break;
                case 'bank':
                    const banks = dataResponse.data.Data.Banks;
                    setData(banks);
                    break;
                case 'branch':
                    const relaventBranches = dataResponse.data.Data.BankBranches.filter((i => i.BankCode === bankNumber));
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
                value={value    }
                onChange={onChange}
                renderValue={() => value}
            >
                {data && data.map(
                    (item, key) => (
                        <MenuItem key={key} value={name === 'bank' ? { code: item.Code, des: item.Description } : item} >
                            {name === 'bank' ? item.Description : item}
                        </MenuItem>
                    )
                )}
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl >
    )
}