import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Spin, Alert } from 'antd';

import {
  getFullPost,
  favoriteArticle,
  unfavoriteArticle,
} from '../../redux/actions/postsActions';
import { trueEdit } from '../../redux/actions/clientActions';
import { dateFormat } from '../../utils/utils';
import { BlogService, URLjpg } from '../../services/blogService';
import PopUp from '../common/PopUp';
import { Tags } from '../common/Tags/Tags';
import { postsState } from '../../redux/selectors/postsSelectors';
import { clientState } from '../../redux/selectors/clientSelectors';
import { userState } from '../../redux/selectors/userSelectors';

import classes from './FullPost.module.scss';

const blogService = new BlogService();

export const FullPost = () => {
  const [popupVisible, setPopupVisibility] = useState(false);

  const dispatch = useDispatch();
  const { serverErrors } = useSelector(clientState);
  const { post } = useSelector(postsState);
  const { user, auth } = useSelector(userState);

  const imgRef = useRef(null);
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  const { slug } = useParams();

  useEffect(() => {
    dispatch(getFullPost(slug));
  }, [slug]);

  const formErrorInet = () => {
    if (serverErrors) {
      return (
        <Alert
          message="Error"
          description="oh it seems your internet connection is gone,
           restore it and reload the page."
          type="error"
          showIcon
        />
      );
    }
  };

  if (post && post.article) {
    const {
      author,
      body,
      createdAt,
      description,
      favorited,
      favoritesCount,
      tagList,
      title,
    } = post.article;

    const closeModal = () => {
      setPopupVisibility(false);
    };

    const openModal = () => {
      setPopupVisibility(true);
    };

    const deletePost = async () => {
      await blogService.setDeletePost(post.article.slug);
      goHome();
    };

    const favorite = async () => {
      if (user) {
        await favoriteArticle(slug, user.token);
        dispatch(getFullPost(slug));
      }
    };

    const unfavorite = async () => {
      if (user) {
        await unfavoriteArticle(slug, user.token);
        dispatch(getFullPost(slug));
      }
    };

    const edit = async () => {
      dispatch(trueEdit());
    };

    return (
      <div>
        <section className={classes.post}>
          <header>
            <div className={classes.left}>
              <div className={classes.post_flex_wrapper}>
                <h2 className={classes.post_title}>{title}</h2>
                <button
                  type="button"
                  onClick={favorited ? unfavorite : favorite}
                  className={classes.post_like}
                >
                  {(favorited && (
                    <HeartFilled
                      className={classes.heart_red}
                    />
                  )) || <HeartOutlined />}{' '}
                  {favoritesCount}
                </button>
              </div>
              <div className={classes.tags_block}>
                <Tags tagList={tagList} />
              </div>
            </div>
            <div className={classes.right}>
              <div>
                <h3>{author.username}</h3>
                <div className={classes.date}>
                  {dateFormat(createdAt)}
                </div>
              </div>
              <img
                ref={imgRef}
                src={author.image || URLjpg}
                onError={() => {imgRef.current.src = URLjpg;}}
                alt="av"
              />
              {auth && author.username === user.username && (
                <div className={classes.buttons_wrapper}>
                  <button
                    type="button"
                    className={classes.delete_button}
                    onClick={openModal}>
                  Delete
                  </button>
                  {popupVisible && (
                    <PopUp
                      deletePost={deletePost}
                      closeModal={closeModal}
                    />
                  )}
                  <Link to="edit">
                    <button
                      onClick={edit}
                      className={classes.edit_button}
                      type="button">
                    Edit
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </header>
          <article className={classes.post_desc}>
            {description}
          </article>
          <article className={classes.post_text}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </article>
        </section>
      </div>
    );
  }

  return (
    <div>
      {serverErrors ? formErrorInet() : <Spin />}
    </div>
  );
};
