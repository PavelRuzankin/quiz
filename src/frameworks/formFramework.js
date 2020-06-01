export function createControls(config, validation) {
  return {
    ...config,
    value: "",
    valid: !validation,
    touched: false,
    type: "text",
    validation,
  };
}

export function validForm(value, validation) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }

  return isValid;
}

export function isAllFormsValid(controls) {
  let isValid = true;
  Object.keys(controls).forEach((elem) => {
    isValid = controls[elem].valid && isValid;
  });

  return isValid;
}
