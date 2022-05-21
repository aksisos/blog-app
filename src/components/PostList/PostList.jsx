import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Spin } from 'antd';

import Post from '../Post';
import { clearPostState, getPosts } from '../../redux/actions/postsActions';
import { loadingEnd, loadingStart } from '../../redux/actions/clientActions';
import { postsState } from '../../redux/selectors/postsSelectors';
import { clientState } from '../../redux/selectors/clientSelectors';

import classes from './PostList.module.scss';

export const PostList = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { posts, postsCount } = useSelector(postsState);
  const { isLoading } = useSelector(clientState);

  useEffect(() => {
    const asyncWrapper = async () => {
      dispatch(loadingStart());
      await dispatch(getPosts(page));
      dispatch(loadingEnd());
    };
    asyncWrapper();

    dispatch(clearPostState());
  }, []);

  const onPageChange = async (currentPage) => {
    dispatch(loadingStart());
    await dispatch(getPosts(currentPage));
    dispatch(loadingEnd());
    setPage(currentPage);
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (posts.length > 0) {
    let keyCounter = 0;
    const postsArray = posts.map((item) => {
      const {
        author,
        body,
        createdAt,
        description,
        slug,
        tagList,
        title,
        favoritesCount,
        favorited,
      } = item;

      const key = `${keyCounter}_${title}_${new Date().getTime()}`;
      keyCounter += 1;
      return (
        <Post
          key={key}
          author={author}
          body={body}
          createdAt={createdAt}
          description={description}
          slug={slug}
          tagList={tagList}
          title={title}
          favoritesCount={favoritesCount}
          favorited={favorited}
          page={page}
        />
      );
    });

    return (
      <>
        {postsArray}
        <Pagination
          showSizeChanger={false}
          className={classes.pages}
          defaultCurrent={1}
          total={postsCount}
          pageSize={5}
          onChange={onPageChange}
          current={page}
        />
      </>
    );
  }

  return null;
};
