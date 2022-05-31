import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

import PostList from './components/PostList';
import FullPost from './components/FullPost';
import { getUserByToken } from './redux/actions/userActions';
import 'antd/dist/antd.min.css';
import Header from './components/Header';
import SignUpForm from './components/forms/SignUp';
import SignInForm from './components/forms/SignIn';
import NewPost from './components/forms/NewPost';
import { getToken } from './utils/utils';
import ProfileEditForm from './components/forms/EditProfile';
import EditPost from './components/forms/EditPost';
import { userState } from './redux/selectors/userSelectors';

const App = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(userState);

  useEffect(() => {
    if (getToken()) {
      dispatch(getUserByToken(getToken()));
    }
  }, []);
  return (
    <>  
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="new-article" element={<NewPost />} />
          <Route path="/articles" element={<PostList />} />
          <Route path="/articles/:slug" element={<FullPost />} />
          <Route path="/articles/:slug/edit" element={<button>unfortunately you can not edit other people posts,
            <Link to="/"> Сome back </Link>and write your wonderful post</button>} />
          {auth && (
            <Route
              path="/articles/:slug/edit"
              element={<EditPost />}
            />
          )}
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route
            path="/profile"
            element={
              auth ? (
                <ProfileEditForm />
              ) : (
                <div>Login required</div>
              )
            }
          />
        </Routes>
      </main>
    </>
  );
};

export const MemoizedApp = React.memo(App);
