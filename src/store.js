const tasks = [
    {
      id: 'card-1',
      title: 'Resarch for new topics',
     
    },
    {
      id: 'card-2',
      title: 'Project ideas',
      
    },
    {
      id: 'card-3',
      title: 'Desiging the app',
      
    },
  ];
  
  const data = {
    lists: {
      'list-1': {
        id: 'list-1',
        title: 'Todo',
        tasks,
      },
      'list-2': {
        id: 'list-2',
        title: 'Doing',
        tasks:[],
      },
      'list-3': {
        id: 'list-3',
        title: 'Done',
        tasks:[],
      },
    },
    listIds: ['list-1', 'list-2', 'list-3'],
  };
  
  export default data;