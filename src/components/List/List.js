import React from 'react'
import {CssBaseline, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Title from './Title';
import Task from '../Task/Task';
import InputContainer from '../Task/InputContainer';
import { Droppable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme)=>({
    root: {
        width: '300px',
        backgroundColor: "#EBECF0",
        marginLeft: theme.spacing(1),
        
    },
    taskContainer: {
        marginTop: theme.spacing(4),
    }
}))

export default function List({list}) {
    const classes = useStyle();
    return (
        <div>
            <Paper className={classes.root}>
                <CssBaseline/>
                <Title title={list.title} listId={list.id}/>
                <Droppable droppableId={list.id}>
                    {(provided)=>(<div ref={provided.innerRef} {...provided.droppableProps}
                        className={classes.taskContainer}>
                        {list.tasks.map((task, index)=>(
                            <Task key={task.id} task={task} index={index}/>
                            ))}
                        {provided.placeholder}
                    </div>)}
                </Droppable>
                <InputContainer listId={list.id} type="task"/>
            </Paper>
        </div>
    )
}
