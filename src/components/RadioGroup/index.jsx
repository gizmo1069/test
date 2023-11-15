import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({value, handleChange, formControl}) {
    
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{formControl.label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {formControl.radios && formControl.radios.map(radio => <FormControlLabel value={radio.value} control={<Radio />} label={radio.subLabel} />)}

      </RadioGroup>
    </FormControl>
  );
}