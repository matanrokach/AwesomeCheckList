import { FETCH_TASKS, CHANGE_TASK_STATUS } from '../actions/types';

export default function(state = [], action){
  switch(action.type){
    case FETCH_TASKS:
      return action.payload;
    case CHANGE_TASK_STATUS:
      if(action.payload.action == 'delete'){
        return state.filter(task => {if(task._id != action.payload.taskId) return task});
      }
      else{
        let tasks = state.map(task => {
          if(task._id === action.payload.taskId){
            switch(action.payload.action){
              case 'done':
                task.done = true;
                return task;
              case 'undone':
                task.done = false;
                return task;
              case 'archive':
                task.archived = true;
                return task;
              case 'unarchive':
                task.archived = false;
                return task;
              default:
                return task;
            }
          }
          return task;
        })
        return tasks;
      }
      return state;
    default:
      return state;
  }
}
