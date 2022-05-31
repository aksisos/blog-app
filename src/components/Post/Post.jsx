import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { dateFormat } from '../../utils/utils';
import {
  getPosts,
  favoriteArticle,
  unfavoriteArticle,
} from '../../redux/actions/postsActions';
import { Tags } from '../common/Tags/Tags';
import { userState } from '../../redux/selectors/userSelectors';

import classes from './Post.module.scss';

export const Post = ({
  author,
  createdAt,
  description,
  slug,
  tagList,
  title,
  favoritesCount,
  favorited,
  page,
}) => {
  const dispatch = useDispatch();

  const { user } = useSelector(userState);

  const favorite = async () => {
    if (user) {
      await favoriteArticle(slug, user.token);
      dispatch(getPosts(page));
    }
  };

  const unfavorite = async () => {
    if (user) {
      await unfavoriteArticle(slug, user.token);
      dispatch(getPosts(page));
    }
  };

  const imgRef = useRef(null);

  const link = `/articles/${slug}`;
  return (
    <section className={classes.post}>
      <header>
        <div className={classes.left}>
          <div className={classes.post_flex_wrapper}>
            <Link to={link}>
              <h2 className={classes.post_title}>{title}</h2>
            </Link>
            <button
              type="button"
              onClick={favorited ? unfavorite : favorite}
              className={classes.post_like}
            >
              {(favorited && (
                <HeartFilled className={classes.heart_red} />
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
            src={ author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg' }
            onError={() => { imgRef.current.src = 'https://static.productionready.io/images/smiley-cyrus.jpg'; }}
            alt="av"
          />
        </div>
      </header>
      <article className={classes.post_text}>{description}</article>
    </section>
  );
};
