import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableContainer, TableHead, Paper } from '@mui/material';
import Column from './column';
import Row from './row';
import axios from 'axios';
import ColumnData from './columnData'
import { Link } from "react-router-dom";

const MainTable = () => {

  const [rowsData, setRowsData] = useState([{}])

  useEffect(() => {
    let data = '';
    const config = {
      method: 'get',
      url: 'https://localhost:7155/api/UserList',
      headers: {},
      data: data
    };

    axios(config)
      .then(function (response) {
        setRowsData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);


  return (
    <Container maxWidth="lg">
      <Link to="/">Back To Form</Link>
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
    </Container>
  );
}
export default MainTable;