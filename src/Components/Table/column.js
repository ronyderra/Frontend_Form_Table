import React from 'react'
import { TableRow, TableCell } from '@mui/material';

const Column = ({ data }) => {
    return (
        <>
            {
                data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell >{item.id}</TableCell>
                        <TableCell >{item.nameH}</TableCell>
                        <TableCell >{item.nameE}</TableCell>
                        <TableCell >{item.birthDate}</TableCell>
                        <TableCell >{item.personalId}</TableCell>
                        <TableCell >{item.city}  </TableCell>
                        <TableCell >{item.bank}</TableCell>
                        <TableCell >{item.branch}</TableCell>
                        <TableCell >{item.accountNumber}</TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}
export default Column;