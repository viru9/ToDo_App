import React, {Component} from 'react';
import MainNav from './main_nav';
import {connect} from 'react-redux';
import {fetchHomeValues} from './../actions/home';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label} from 'reactstrap';
import {validate} from './form_validation_addlist';
import { Field, reduxForm } from 'redux-form';
import TextFieldInput from './common/render_input';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchHomeValues(() => {
      console.log("fetchHomeValues: ",this.props.home);
    });
  }

  renderData() {
    return _.map(this.props.home.home.response, data => {
      return (
        <div key={data.id}>{data.value}</div>
      )
    });
  }

  render() {
    return (
      <div>
        <MainNav/>
          {this.renderData()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {home: state};
}

export default connect(mapStateToProps, {fetchHomeValues})(Home);
