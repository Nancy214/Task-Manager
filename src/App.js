import { useState } from 'react';
import './App.css';
import List from './components/List/List';
import store from './store';
import StoreApi from './storeApi';
import {v4 as uuid} from 'uuid';
import InputContainer from './components/Task/InputContainer';

import {makeStyles} from '@material-ui/core/styles';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header/Header';

const useStyle = makeStyles((theme)=>({
    root: {
        display: 'flex',
        minHeight: '100vh',
        background: '#EDAE49',
        width: '100%',
        overflowY: 'auto',
    },
}))

function App() {
  const classes = useStyle();
  const [data, setData] = useState(store);
  const addMoreTask = (title, listId) =>{
    const newTaskId = uuid();
    const newTask = {
      id: newTaskId,
      title,
    };
    const list = data.lists[listId];
    list.tasks = [...list.tasks, newTask]

    const newState = {
      ...data,
      lists:{
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  }
  
  const addMoreList = (title) =>{
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      tasks: [],
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      }
    }
    setData(newState)
  }

  const updateListTitle = (title, listId) =>{
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists:{
        ...data.lists,
        [listId]: list,
      }
    }
    setData(newState);
  }
  const onDragEnd = (result) =>{
    const {destination, source, draggableId} = result;
    if(!destination){
      return
    }
    const sourceList = data.lists[source.droppableId]
    const destinationList = data.lists[destination.droppableId]
    const draggingTask = sourceList.tasks.filter((task)=>(task.id === draggableId))[0]

    if(source.droppableId === destination.droppableId){
      sourceList.tasks.splice(source.index, 1);
      destinationList.tasks.splice(destination.index, 0, draggingTask)
      const newState = {
        ...data,
        lists:{
          ...data.lists,
          [sourceList]: destinationList,
        },
      }
      setData(newState);
    }else{
      sourceList.tasks.splice(source.index, 1);
      destinationList.tasks.splice(destination.index, 0, draggingTask)

      const newState = {
        ...data,
        lists:{
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      }
      setData(newState);
    }
  }
  

  return (
    <StoreApi.Provider value={{addMoreTask, addMoreList, updateListTitle}}>
      <Header/>
      <DragDropContext onDragEnd={onDragEnd}>

      <div className={classes.root}>
        {data.listIds.map((listId)=>{
          const list = data.lists[listId];
          return(<List list={list} key={listId} />)
          
          
        })}
        <InputContainer type="list"/>
      </div>
      </DragDropContext>
    </StoreApi.Provider>
  );
}

export default App;
