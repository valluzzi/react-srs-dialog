import React, { useEffect, useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import './EpsgDialogSearch.css';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


const EpsgDialogSearch = (props) => {

  const { onClose, open, onOptionSelect } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!searchTerm) return;

    const fetchData = async () => {
      try {
        const response = await fetch('https://epsg.io/?format=json&q=' + searchTerm+'&limit=25');
        const res = await response.json();
        setData(res.results);
      } catch (error) {
        console.error("Errore durante la fetch:", error);
      }
    };

    fetchData();

  }, [searchTerm]); 


  function chooseOption(e,option){
    onOptionSelect(e);
    setSearchTerm(`${e.authority}: ${e.code}`)

  }

  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      let query = searchTerm.toString().toLowerCase().trim();
      
      return data.filter((item) => (`${item.authority}: `.toLowerCase()).includes(query) || (item.area.toLowerCase()).includes(query) || (item.name.toLowerCase()).includes(query) || (item.code.toString()).includes(query));
    }
    return [];
  }, [data, searchTerm]); 

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td': {
      border: 0,
    },
  }));

  return (
  <Dialog
  sx = {props.sx} 
  className='EPSGDialogSearch'
  onClose={handleClose} 
  open={open} 
  maxWidth="xl"
  fullWidth={true}
  >

    <DialogTitle>Choose a Spatial Reference System</DialogTitle>
    <TextField id="outlined-basic" 
    label="SRS" variant="outlined"  
    value={searchTerm}
    onChange={handleChange}
    placeholder={`${props.value.authority}: ${props.value.code}`}/>

    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, minHeight:200}} 
        aria-label="Pro">
        <TableHead>
          <TableRow>
            <TableCell align="center">Code</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Area</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filteredData && filteredData.length>0 && searchTerm.length>0 && 
          (filteredData.map((item, index) => (
            <StyledTableRow
              key={item.name+'-'+item.code+'-'+item.area+'-'+item.kind}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => chooseOption(item)} 
              hover={true}
            >
              <TableCell component="th" scope="row">{item.authority}: {item.code} </TableCell>
              <TableCell align="center">{item.area}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              
            </StyledTableRow>
          )))}
          {filteredData && filteredData.length===0 && searchTerm.length>0 && 
          (
          <TableRow className="no-results">
            <TableCell colSpan={3} align="center">No Spatial Reference Systems Available</TableCell>
          </TableRow>
          )}
         
        </TableBody>
      </Table>
    </TableContainer>
    
  </Dialog>   
  )
}

export default EpsgDialogSearch;

EpsgDialogSearch.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  
};



