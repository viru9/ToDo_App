import React, {Component} from 'react';
import MainNav from './main_nav';
import {connect} from 'react-redux';
import {fetchHomeValues} from './../actions/home';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap';
import {validate} from './form_validation_addlist';
import { Field, reduxForm } from 'redux-form';
import TextFieldInput from './common/render_input';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
 this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.props.fetchHomeValues(() => {
      console.log("fetchHomeValues: ",this.props.home);
    });
  }

  renderData() {
    return _.map(this.props.home.home.response, data => {
      return (

<tr key={data.id}>
<td>

<label className="checkbox-task"><span>{data.value}</span>
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>

</td>
<td>
{data.priority === 'Low' && <span className="badge-priority badge-low">{data.priority}</span>}
{data.priority === 'Med' && <span className="badge-priority badge-med">{data.priority}</span>}
{data.priority === 'High' && <span className="badge-priority badge-high">{data.priority}</span>}
</td>
</tr>

      )
    });
  }

  onTaskAdd(values){

    let new_val = {
      id: this.props.home.home.response.length+1,
      priority: values.priority,
      value: values.add_name
    }

    this.props.home.home.response.push(new_val);

    this.setState({modal:false});
    this.props.reset();

  }

  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div>
        <MainNav/>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add List Data</ModalHeader>
          <ModalBody>

          <Form onSubmit={handleSubmit(this.onTaskAdd.bind(this))} noValidate>

                  <FormGroup>
                    <Label for="add_name">Select Priority</Label>
                    <Field type="text" name="add_name" id="add_name" component={TextFieldInput} placeholder="Please enter add name"/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="priority">Select Priority</Label>
                    <Field id="priority" className="form-control" name="priority" component="select">
                    <option></option>
                    <option value="Med">Med</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                    </Field>
                  </FormGroup>

                  <FormGroup>
                        <Button type={"submit"} disabled={pristine || submitting}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </FormGroup>

          </Form>

          </ModalBody>

        </Modal>

        <table className="task-table">
        <thead>
          <tr>
            <th><button className="btn-add-task" onClick={this.toggle}>Add Task</button></th>
            <th className="text-fade">Priority</th>
          </tr>
        </thead>

        <tbody>
          {this.renderData()}
        </tbody>

        </table>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {home: state};
}

let taskAddingForm = reduxForm({validate, form: 'taskAddingForm'})(Home);
export default connect(mapStateToProps, {fetchHomeValues})(taskAddingForm);
