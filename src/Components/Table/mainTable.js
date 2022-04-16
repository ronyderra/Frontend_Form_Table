import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Column from './column';
import Row from './row';
import axios from 'axios';
import ColumnData from './columnData'
import { Link } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const MainTable = () => {

  const [rowsData, setRowsData] = useState([{}])

  useEffect(() => {
    let data = '';

    var config = {
      method: 'get',
      url: 'https://localhost:7155/api/UserList',
      headers: {},
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRowsData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);


  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <Column data={ColumnData} />
          </TableHead>
          <TableBody>
            <Row data={rowsData} />
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/">Back To Form</Link>
    </Container>
  );
}
export default MainTable;