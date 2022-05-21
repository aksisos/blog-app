import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { register } from '../../../redux/actions/userActions';
import { clientState } from '../../../redux/selectors/clientSelectors';
import { userState } from '../../../redux/selectors/userSelectors';
import { signUpValidation } from '../../../utils/formValidationRules';

import classes from './SignUp.module.scss';

export const SignUp = () => {
  const dispatch = useDispatch();

  const { serverErrors } = useSelector(clientState);
  const { user } = useSelector(userState);

  const {
    register: registerForm,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({});
  const password = useRef({});
  const navigate = useNavigate();
  const goHome = () => navigate('/');
  password.current = watch('password', '');

  const onSubmit = async (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };

    await dispatch(register(userData));
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
      <h4 className={classes.form_title}>Create new account</h4>
      <span>Username</span>
      <input
        type="text"
        className={classNames(classes.input, {
          [classes.red_input]:
                        errors.username ||
                        (serverErrors && serverErrors.username),
        })}
        placeholder="Username"
        {...registerForm('username', { ...signUpValidation.username })}
      />
      {formErrorMessage('username')}
      <span>Email adress</span>
      <input
        type="email"
        className={classNames(classes.input, {
          [classes.red_input]:
                        errors.email || (serverErrors && serverErrors.email),
        })}
        placeholder="Email adress"
        {...registerForm('email', { ...signUpValidation.email })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      {formErrorMessage('email')}
      <span>Password</span>
      <input
        name="password"
        className={classNames(classes.input, {
          [classes.red_input]: errors.password,
        })}
        type="password"
        placeholder="Password"
        {...registerForm('password', { ...signUpValidation.password })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <span>Repeat password</span>
      <input
        type="password"
        className={classNames(classes.input, {
          [classes.red_input]: errors.password_repeat,
        })}
        placeholder="Repeat password"
        {...registerForm('password_repeat', {
          required: 'Enter password',
          validate: (value) =>
            value === password.current || 'Passwords must match',
        })}
      />
      {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

      <div className={classes.dasher} />

      <label className={classes.agree_checkbox}>
        <input
          type="checkbox"
          placeholder="I agre"
          {...registerForm('agree', {
            required: 'Cannot process further without agreement',
          })}
        />
                I agree to the processing of my personal information
      </label>
      {errors.agree && <p>{errors.agree.message}</p>}

      <input type="submit" value="Create" />
    </form>
  );
};
