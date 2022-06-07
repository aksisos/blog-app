import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import PostList from './components/PostList';
import FullPost from './components/FullPost';
import { getUserByToken } from './redux/actions/userActions';
import 'antd/dist/antd.min.css';
import Header from './components/Header';
import SignUpForm from './components/forms/SignUp';
import SignInForm from './components/forms/SignIn';
import PostForm from './components/forms/PostForm';
import { getToken } from './utils/utils';
import ProfileEditForm from './components/forms/EditProfile';
import { userState } from './redux/selectors/userSelectors';

const App = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(userState);
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  useEffect(() => {
    if (getToken()) {
      dispatch(getUserByToken(getToken()));
    }
  }, []);

  const PrivateRoute = ({auth, children}) => {
    if (!auth) {
      return <div>{goHome()}</div>;
    }
    return children;
  };

  return (
    <>  
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="new-article" element={<PostForm />} />
          <Route path="/articles" element={<PostList />} />
          <Route path="/articles/:slug" element={<FullPost />} /> 
          <Route
            path="/articles/:slug/edit"
            element={
              <PrivateRoute auth={auth}>
                <PostForm />
              </PrivateRoute>
            }
          />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute auth={auth}>
                <ProfileEditForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export const MemoizedApp = React.memo(App);
