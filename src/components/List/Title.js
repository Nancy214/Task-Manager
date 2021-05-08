import { InputBase, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import storeApi from '../../storeApi';

const useStyle = makeStyles((theme)=>({
    editableTitle : {
        flexGrow: 1,
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    editableTitleContainer: {
        margin: theme.spacing(1),
        display: "flex",
    },
    input: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: theme.spacing(1),
        '&:focus': {
            background: "#ddd",
        },
    },
}));

export default function Title({title, listId}) {
    const [open, setOpen] = useState(false);
    const classes = useStyle();
    const [newTitle, setNewTitle] = useState(title);
    const {updateListTitle} = useContext(storeApi);

    const handleOnChange = (e) =>{
        setNewTitle(e.target.value);
    }
    const handleOnBlur = () =>{
        updateListTitle(newTitle, listId);
        setOpen(false);
    }

    return (
        <div>
            {open ? (<div>
                        <InputBase 
                        value={newTitle}
                        inputProps={{className: classes.input}}
                        fullWidth
                        autoFocus
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        />
                    </div>)
                :   (<div className={classes.editableTitleContainer}>
                        <Typography 
                        onClick={()=> setOpen(!open)}
                        className={classes.editableTitle}
                        >
                            {title}
                        </Typography>
                        <MoreHorizIcon/>
                    </div>)
            }
            
            
            
        </div>
    )
}
