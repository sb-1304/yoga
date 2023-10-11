import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';

export default function MultipleSelect({ list, value, setter, id, label, className, ...rest }) {

    const handleChange = (e) => {
        const val = e.target.value;
        setter(typeof val === 'string' ? val.split(',') : val);
    };

    return (<>
        {label ? <InputLabel id={'label' + id} htmlFor={id}>{label}</InputLabel> : <></>}
        <Select
            id={id}
            multiple
            value={value}
            className={className}
            onChange={handleChange}
            renderValue={(checked) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {checked.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                </Box>
            )}
            {...rest}
        >
            {list.map((name) => (
                <MenuItem
                    key={name}
                    value={name}
                >
                    {name}
                </MenuItem>
            ))}
        </Select>
    </>
    );
}