import * as React from 'react';
import PublicIcon from '@mui/icons-material/Public';
import Button from '@mui/material/Button';
import SrsDialog from '../dialogs/SrsDialog';

const ParentComponent = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (auth_id) => {
    setOpen(false);
  };
  
  const handleOptionSelect = (auth_id) => {
    setSelectedOption(auth_id);
    console.log(auth_id);
  };
 

  return (
    <>
      <Button 
      variant="outlined" 
      startIcon={<PublicIcon />} 
      onClick={handleClickOpen}
      sx={{ width: 300,margin: 5 }}
      >
        {selectedOption ? `${selectedOption}` : 'Seleziona'}
      </Button>
      
      <SrsDialog open={open} onClose={handleClose} onOptionSelect={handleOptionSelect} />
    </>
  )
}

export default ParentComponent;
