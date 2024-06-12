/* eslint-disable react/prop-types */
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectOption = ({ setDetails, details, name, label, value, items, teachers, singleValueUpdate }) => {

    const handleChange = (e) => {
        if (singleValueUpdate) {
            setDetails(e.target.value)
        } else {
            setDetails({ ...details, [name]: e.target.value })
        }
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    name={name}
                    onChange={handleChange}
                >
                    {items?.map((item, i) =>
                        <MenuItem
                            key={i}
                            value={item}
                        >
                            {item} {teachers && `: (${teachers[i]})`}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectOption