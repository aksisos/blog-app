import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import {
  getFullPost,
  favoriteArticle,
  unfavoriteArticle,
} from '../../redux/actions/postsActions';
import { dateFormat, getToken } from '../../utils/utils';
import { fetchRequest } from '../../utils/requests';
import PopUp from '../common/PopUp';
import { Tags } from '../common/Tags/Tags';
import { postsState } from '../../redux/selectors/postsSelectors';
import { userState } from '../../redux/selectors/userSelectors';

import classes from './FullPost.module.scss';

export const FullPost = () => {
  const [popupVisible, setPopupVisibility] = useState(false);

  const dispatch = useDispatch();

  const { post } = useSelector(postsState);
  const { user, auth } = useSelector(userState);

  const imgRef = useRef(null);
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  const { slug } = useParams();

  useEffect(() => {
    dispatch(getFullPost(slug));
  }, [slug]);

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
      await fetchRequest(
        `articles/${post.article.slug}`,
        'DELETE',
        getToken()
      );
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
                src={
                  author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
                }
                onError={() => {
                  imgRef.current.src = 'https://static.productionready.io/images/smiley-cyrus.jpg';
                }}
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
      <Spin />
    </div>
  );
};
