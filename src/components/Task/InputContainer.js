import { Collapse, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import {fade, makeStyles} from '@material-ui/core/styles'
import InputTask from './InputTask';

const useStyle = makeStyles((theme)=>({
    root: {
        width: '300px',
        marginTop: theme.spacing(1),
    },
    addTask: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(0, 1, 1, 1),
        background: '#EBECF0',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: fade('#000', 0.25),
        }
    },
}))

export default function InputContainer({listId, type}) {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputTask setOpen={setOpen} listId={listId} type={type}/>
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addTask} elevation={0} onClick={()=> setOpen(!open)}>
                    <Typography>{type === 'task' ? '+ Add a Task' : 'Add a List'}</Typography>
                </Paper>
            </Collapse>
        </div>
    )
}
