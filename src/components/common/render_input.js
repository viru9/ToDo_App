import {Input, FormFeedback, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import React from 'react';

const TextFieldInput = (props) => {

  const {
    label,
    input,
    type,
    meta: {
      touched,
      error
    }
  } = props;

  return (
    <div>

    {/*
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    */}

      <Input
      valid={touched && !error && true}
      invalid={touched && error && true}
      type={props.type}
      name={props.name}
      id={props.id}
      className={props.className}
      placeholder={props.placeholder}
      autoComplete={'off'}
      {...props.input}
      />

      <FormFeedback className="errorMsg">
        {touched
          ? error
          : ''}</FormFeedback>

    </div>
  );
}

export default TextFieldInput;
