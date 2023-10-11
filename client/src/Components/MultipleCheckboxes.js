import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultipleCheckboxes({ options, value, setter, id, placeholder, className, disable, readonly, ...rest }) {

    const handleChange = (event, newValues, type, change) => {
        setter(newValues);
    }



    return (
        <Autocomplete
            multiple
            id={id}
            className={className}
            options={options}
            disabled={disable}
            readOnly={readonly}
            value={value}
            disableCloseOnSelect
            onChange={handleChange}
            getOptionLabel={option => option}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label="Class Sequence" placeholder="Favorites" />
            )}
            {...rest}
        />
    );
}
