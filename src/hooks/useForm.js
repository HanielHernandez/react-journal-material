import { useState, useEffect, useMemo } from "react";

export const useForm = (initialForm = {}, validations = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    createValidators();
  }, [formState]);

  const [formValidation, setformValidation] = useState({});

  const onResetForm = () => {
    setFormState(initialForm);
  };

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(validations)) {
      const [fn, errorMessage] = validations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setformValidation(formCheckedValues);
    console.log(formValidation)

  };

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
