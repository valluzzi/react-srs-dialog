import * as React from 'react';
import PublicIcon from '@mui/icons-material/Public';
import Button from '@mui/material/Button';
// import SrsDialogSearch from '../dialogs/SrsDialogSearch';
import EpsgDialogSearch from '../dialogs/EpsgDialogSearch';


const ParentComponent = () => {
  const initialValue = {
    "accuracy": "",
    "area": "World.",
    "authority": "EPSG",
    "bbox": [
      90.0,
      -180.0,
      -90.0,
      180.0
    ],
    "code": "4326",
    "default_trans": 0,
    "kind": "CRS-GEOGCRS",
    "name": "WGS 84",
    "proj4": "+proj=longlat +datum=WGS84 +no_defs +type=crs",
    "trans": [
      3858,
      3859,
      8037,
      9618,
      9704,
      9706,
      9708,
      10084,
      15781
    ],
    "unit": "degree (supplier to define representation)",
    "wkt": "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.0174532925199433,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]"
  }

  const [selectedOption, setSelectedOption] = React.useState(initialValue);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (code) => {
    setOpen(false);
  };
  
  const handleOptionSelect = (code) => {
    setSelectedOption(code);
    console.log(code);
  };
 

  return (
    <>
      <Button 
      variant="outlined" 
      startIcon={<PublicIcon />} 
      onClick={handleClickOpen}
      sx={{ width: 300,margin: 5 }}
      >
        {selectedOption && selectedOption.code ? `${selectedOption.authority}: ${selectedOption.code}` : 'Seleziona'}
      </Button>

      <EpsgDialogSearch open={open} onClose={handleClose} onOptionSelect={handleOptionSelect} value={selectedOption}/>
    </>
  )
}

export default ParentComponent;
