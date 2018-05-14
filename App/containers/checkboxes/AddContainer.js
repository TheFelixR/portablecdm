import AddComponent from '../../components/checkbox-view/AddComponent'

import { connect } from 'react-redux';
import { addNewTask } from '../../actions';

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: (inputTaskName) => {
            dispatch(addNewTask(inputTaskName));
        }
    };
}

const AddContainer = connect(mapStateToProps,mapDispatchToProps)(AddComponent);
export default AddContainer;