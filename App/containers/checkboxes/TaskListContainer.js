import TaskListComponent from '../../components/checkbox-view/TaskListComponent'

import { connect } from 'react-redux';
import { toggleTask } from '../../actions';

const mapStateToProps = state => {
        return {
        tasks: !state.taskReducers ? [] : state.taskReducers
    }
}

const TaskListContainer = connect(mapStateToProps)(TaskListComponent);
export default TaskListContainer