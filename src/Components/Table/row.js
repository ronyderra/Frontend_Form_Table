import React from 'react'
import { TableRow, TableCell } from '@mui/material';

const Row = ({ data }) => {
    return (
        <>
            {
                data.map((row, key) => (
                    <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell align="center">{row.nameH}</TableCell>
                        <TableCell align="center">{row.nameE}</TableCell>
                        <TableCell align="center">{row.birthDate}</TableCell>
                        <TableCell align="center">{row.personalId}</TableCell>
                        <TableCell align="center">{row.city}</TableCell>
                        <TableCell align="center">{row.bank}</TableCell>
                        <TableCell align="center">{row.branch}</TableCell>
                        <TableCell align="center">{row.accountNumber}</TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}
export default Row;