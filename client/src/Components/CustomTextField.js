import TextField from '@mui/material/TextField';
import { useId, useEffect } from 'react';

export default function CustomTextField({ value, setter, id, placeholder, className, disable, readonly, ...rest }) {

    const uid = useId();

    useEffect(() => {

    }, [value])

    return (<>
        <TextField
            id={id ? id : uid}
            className={className}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disable}
            value={value}
            onChange={(e) => setter(e.target.value)}
            {...rest}
        />
    </>)
}