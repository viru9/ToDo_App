export function validate(values) {

  const errors = {};

  if (!values.user_name) {
    errors.user_name = "Please enter user name";
  }

  if (!values.user_password) {
    errors.user_password = "Please enter user password";
  }

  return errors;
}
