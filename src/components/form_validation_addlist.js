export function validate(values) {

  const errors = {};

  if (!values.add_name) {
    errors.add_name = "Please enter add name";
  }

  if (!values.priority) {
    errors.priority = "Please select a priority";
  }

  return errors;
}
