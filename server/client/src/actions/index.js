import axios from 'axios';
import { FETCH_TASKS } from './types';
import { CHANGE_TASK_STATUS } from './types';
import { socket } from '../components/SocketIOBasic';

export const fetchTasks = () => async (dispatch) => {
  const res = await axios.get('/api/get_all_items');

  dispatch({type: FETCH_TASKS, payload: res.data});
};

export const changeTaskStatus = (taskId, action) => async (dispatch) => {
  let res = await axios.get('/api/' + action + '/' + taskId);

  if(res.data == '0')
  {
    socket.send('UPDATE_ALL_USERS');
    dispatch({type: CHANGE_TASK_STATUS, payload: {taskId , action}});
  }
  else{
    dispatch({type: CHANGE_TASK_STATUS, payload: res.data});
  }
};
