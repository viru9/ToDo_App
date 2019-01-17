import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {validate} from './form_validation';
import TextFieldInput from './common/render_input';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
  Label,
  Container,
  Row,
  Col
} from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  onUserAdd(values){

    if(values.user_name === 'vm' && values.user_password==="123"){
      localStorage.setItem('user_token','vm');
      this.props.history.push('/home');
    }
    else {
      NotificationManager.error('Failed', 'Invalid username or password', 1000, () => {});
      this.props.reset();
    }

  }

  render() {

const { handleSubmit, pristine, reset, submitting } = this.props;

    return (

      <Container>

      <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(this.onUserAdd.bind(this))} noValidate>

                      <FormGroup className="mobile-formgroup">
                        <label>User Name</label>
                        <Field type="text" name="user_name" component={TextFieldInput} placeholder="Please enter user name"/>
                      </FormGroup>

                      <FormGroup>
                        <label>Password</label>
                        <Field type="password" name="user_password" component={TextFieldInput}/>
                      </FormGroup>

                      <FormGroup>
                            <Button type={"submit"} disabled={pristine || submitting}>Sign up</Button>
                          <Button type={"button"} disabled={pristine || submitting} onClick={reset}>Clear</Button>
                      </FormGroup>

            </Form>

          </Col>
      </Row>

      <NotificationContainer/>

      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {user_login: state};
}


let userLoginForm = reduxForm({validate, form: 'userLoginForm'})(LoginPage);
export default connect(mapStateToProps, {})(userLoginForm);
