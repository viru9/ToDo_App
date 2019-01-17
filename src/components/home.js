import React, {Component} from 'react';
import MainNav from './main_nav';
import {connect} from 'react-redux';
import {fetchHomeValues} from './../actions/home';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap';
import {validate} from './form_validation';
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
      console.log('data: ',data);
      return (

<tr key={data.id}>
<td><input type="checkbox" name="vehicle" value="Bike"/>{data.value}</td>
<td>{data.priority}</td>
</tr>

      )
    });
  }

  onTaskAdd(values){

  console.log('onTaskAdd: ',values);

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
                    <label>User Name</label>
                    <Field type="text" name="user_name" component={TextFieldInput} placeholder="Please enter user name"/>
                  </FormGroup>

                  <FormGroup>
                           <Label for="exampleSelect">Select Priority</Label>
                           <Input type="select" name="select" id="exampleSelect">
                             <option>Med</option>
                             <option>High</option>
                             <option>Low</option>
                           </Input>
                  </FormGroup>

                  <FormGroup>
                        <Button type={"submit"} disabled={pristine || submitting}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </FormGroup>

          </Form>

          </ModalBody>
        
        </Modal>

        <table>
        <thead>
          <tr>
            <th><button onClick={this.toggle}>Add</button></th>
            <th>Priority</th>
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

// export default connect(mapStateToProps, {fetchHomeValues})(Home);


let taskAddingForm = reduxForm({validate, form: 'taskAddingForm'})(Home);
export default connect(mapStateToProps, {fetchHomeValues})(taskAddingForm);
