import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../../redux/actions/userActions';
import { clientState } from '../../../redux/selectors/clientSelectors';
import { userState } from '../../../redux/selectors/userSelectors';
import { signInValidation } from '../../../utils/formValidationRules';

import classes from './SignIn.module.scss';

export const SignIn = () => {
  const dispatch = useDispatch();

  const { serverErrors } = useSelector(clientState);
  const { user } = useSelector(userState);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({});
  const navigate = useNavigate();
  const goHome = () => navigate('/');
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data) => {
    const userData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (user) {
      return goHome();
    }
    return undefined;
  });

  const formErrorMessage = (formName) => {
    if (serverErrors) {
      if (serverErrors[formName]) {
        return (
          <p>
            {formName} {serverErrors[formName]}
          </p>
        );
      }
    }

    return errors[formName] && <p>{errors[formName].message}</p>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h4 className={classes.form_title}>Sign In</h4>
      {formErrorMessage('email or password')}
      <span>Email adress</span>
      <input
        type="email"
        className={classNames(classes.input, {
          [classes.red_input]:
                        errors.email ||
                        (serverErrors && serverErrors['email or password']),
        })}
        placeholder="Email adress"
        {...register('email', { ...signInValidation.email })}
      />
      <span>Password</span>
      <input
        name="password"
        className={classNames(classes.input, {
          [classes.red_input]:
                        errors.password ||
                        (serverErrors && serverErrors['email or password']),
        })}
        type="password"
        placeholder="Password"
        {...register('password', { ...signInValidation.password })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" value="Login" />
    </form>
  );
};
