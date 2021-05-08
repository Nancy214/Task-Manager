import { Paper } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Draggable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme)=>({
    card: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
    },
}))

export default function Task({task, index}) {
    const classes = useStyle();
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided)=>(
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <Paper className={classes.card}>
                        {task.title}
                        
                    </Paper>
                </div>
                
            )}

        </Draggable>
    )
}
