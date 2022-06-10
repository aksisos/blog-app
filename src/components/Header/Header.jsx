import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout, authToggle } from '../../redux/actions/userActions';
import { getPosts } from '../../redux/actions/postsActions';
import { userState } from '../../redux/selectors/userSelectors';
import { URLjpg } from '../../services/services';

import classes from './Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();

  const { user, auth } = useSelector(userState);

  const imgRef = useRef(null);

  const logOutHandler = () => {
    if (auth) {
      localStorage.removeItem('token');
      dispatch(logout());

      dispatch(authToggle(false));
    }
  };

  useEffect(() => {
    const asyncWrapper = async () => {
      await dispatch(getPosts());
    };
    asyncWrapper();

  }, [auth]);

  const userInfoToggle = user ? (
    <>
      <Link to="/new-article">
        <button type="button" className={classes.create_button}>
          Create article
        </button>
      </Link>
      <button
        type="button"
        name="profile"
        className={classes.profile_button}
      >
        <Link to="/profile">
          {user.username}{' '}
          {
            <img
              ref={imgRef}
              src={user.image || URLjpg}
              onError={() => {imgRef.current.src =URLjpg;}}
              alt="av"
              className={classes.user_image}
            />
          }
        </Link>
      </button>
      <button
        type="button"
        className={classes.log_out_button}
        onClick={logOutHandler}
      >
        <Link to="/">Log Out</Link>
      </button>
    </>
  ) : (
    <>
      {' '}
      <button type="button" className={classes.sign_in_button}>
        <Link to="sign-in">Sign In</Link>
      </button>
      <button type="button" className={classes.sign_up_button}>
        <Link to="sign-up">Sign Up</Link>
      </button>
    </>
  );

  return (
    <header className={classes.blog_header}>
      <button type="button" className={classes.blog_title}>
        <Link to="/">Realworld Blog</Link>
      </button>
      <div className={classes.flex_wrapper}>{userInfoToggle}</div>
    </header>
  );
};
