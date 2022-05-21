import { format, parse } from 'date-fns';
import React from 'react';

export const setToken = (user) => {
  if (user) {
    localStorage.setItem('token', user.token);
  }
};

export const getToken = () => localStorage.getItem('token');

export const dateFormat = (dateString) => {
  const str = dateString.slice(0, 10);
  const date = parse(str, 'yyyy-MM-dd', new Date());
  return format(date, 'MMMM d, yyyy');
};

export const formErrorMessage = (formName, serverErrors, formErrors) => {
  if (serverErrors) {
    if (serverErrors[formName]) {
      return (
        <p>
          {formName} {serverErrors[formName]}
        </p>
      );
    }
  }

  return formErrors[formName] && <p>{formErrors[formName].message}</p>;
};
