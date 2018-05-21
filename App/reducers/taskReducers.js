import {ADD_NEW_TASK, TOGGLE_ONE_TASK } from '../actions/types.js';

const taskReducer = (tasks = [], action) => {
    switch (action.type) {
        case ADD_NEW_TASK:
            return [...tasks,{
                    taskId: action.taskId,
                    taskName: action.taskName,
                    completed: false}
            ]
        case TOGGLE_ONE_TASK:
            return tasks.map( task => //iterate the tasks
                (task.Id === action.taskId) 
                ? {...task, completed: !task.completed} // clone to a new object and then change
                : task 
                
            )
        default:
            return tasks; //state does not change
    }
}

export default taskReducer;