import { Button, IconButton, InputBase, Paper } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import {fade, makeStyles} from '@material-ui/core/styles'
import storeApi from '../../storeApi'



const useStyle = makeStyles((theme)=>({
    
    task: {
        width: '280px',
        margin: theme.spacing(0, 1, 1, 1),
        paddingBottom: theme.spacing(4),
        

    },
    input: {
        margin: theme.spacing(1),
    },
    btnConfirm: {
        background: '#5AAC44',
        color: '#fff',
        
        "&:hover":{
            background: fade('#5AAC44', 0.75),
        }
    },
    btnFile: {
        
        background: '#09ade8',
        color: '#fff',
        
        "&:hover":{
            background: fade('#09ade8', 0.75),
        }
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1),
    },

}))


export default function InputTask({setOpen, listId, type}) {
    const classes = useStyle();
    const [inputTitle, setInputTitle] = useState('');
    const {addMoreTask, addMoreList} = useContext(storeApi);
    const handleOnChange = (e) =>{
        setInputTitle(e.target.value);
    }
    const handleBtnConfirm = () =>{
        if(type === 'task'){
            addMoreTask(inputTitle, listId);
            setInputTitle('');
            setOpen(false);

        }else{
            addMoreList(inputTitle);
            setInputTitle('');
            setOpen(false);
        }
    }
    
    
    return (
        <div>
            <div>
              
                <Paper className={classes.task}>
                    <InputBase
                        multiline
                        onBlur={()=>setOpen(false)}
                        fullWidth 
                        inputProps={{className: classes.input, }}
                        placeholder={type === 'task' ? 'Enter Task' : 'Enter List'}
                        onChange={handleOnChange}
                        value={inputTitle}
                    />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button 
                    className={classes.btnConfirm} 
                    onClick={handleBtnConfirm}
                >
                    {type === 'task' ? 'Add Task' : 'Add List'}
                </Button>
                {type === 'task' ? 
                        (<div>
                            <Button
                                className={classes.btnFile}
                                component="label">
                                Image/Video
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                            <IconButton className={classes.confirm}>
                                <ClearIcon onClick={()=> setOpen(false)}/>
                            </IconButton>

                        </div>
                )
                :(
                    <IconButton className={classes.confirm}>
                        <ClearIcon onClick={()=> setOpen(false)}/>
                    </IconButton>
                )
            }
                    
                
            </div>
        </div>
        
    )
}
