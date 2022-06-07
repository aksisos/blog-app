import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { fetchRequest } from '../../../services/services';
import { setUser } from '../../../redux/actions/userActions';
import { setToken } from '../../../utils/utils';
import { clientState } from '../../../redux/selectors/clientSelectors';
import { userState } from '../../../redux/selectors/userSelectors';
import { editProfileValidation } from '../../../utils/formValidationRules';

import classes from './EditProfile.module.scss';

export const EditProfile = () => {
  const dispatch = useDispatch();

  const { serverErrors } = useSelector(clientState);
  const { user } = useSelector(userState);
  const [ ress, setRess ] = useState('');

  const userValues = {
    username: user.username,
    email: user.email,
    password: '',
    image: user.image,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: userValues,
  });
  const password = useRef({});
  password.current = watch('password', '');

  const editProfile = async (data) => {
    const res = await fetchRequest('user', 'PUT', user.token, data);
    return res;
  };

  const onSubmit = async (data) => {
    const obj = { ...data };
    if (data.password === '') {
      delete obj.password;
    }
    const userData = {};
    userData.user = obj;
    const response = await editProfile(userData);
    const res = await response.json();
    if (res.user) {
      dispatch(setUser(res));
      setToken(res.user);
      setRess('');
    } 
    setRess(res.errors.username);
  };

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
      <h4 className={classes.form_title}>Edit Profile</h4>
      <span>Username</span>
      <input
        type="text"
        className={classNames(classes.input, {
          [classes.red_input]: errors.username || (serverErrors && serverErrors.username) || ress,
        })}
        placeholder="Username"
        {...register('username', { ...editProfileValidation.username })}
      />
      <p>{ress}</p>
      {formErrorMessage('username')}
      <span>Email adress</span>
      <input
        type="email"
        className={classNames(classes.input, {
          [classes.red_input]: errors.email || (serverErrors && serverErrors.email),
        })}
        placeholder="Email adress"
        {...register('email', { ...editProfileValidation.email })}
      />
      {formErrorMessage('email')}
      <span>New password</span>
      <input
        name="password"
        className={classNames(classes.input, {
          [classes.red_input]: errors.password,
        })}
        type="password"
        placeholder="New password"
        {...register('password', { ...editProfileValidation.password })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <span>Avatar image (url)</span>
      <input
        type="text"
        className={classNames(classes.input, {
          [classes.red_input]: errors.image,
        })}
        placeholder="Avatar image"
        {...register('image', { ...editProfileValidation.url })}
      />
      {errors.image && <p>{errors.image.message}</p>}

      <input type="submit" value="Save" />
    </form>
  );
};
