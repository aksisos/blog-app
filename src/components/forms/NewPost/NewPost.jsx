import classNames from 'classnames';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { postsState } from '../../../redux/selectors/postsSelectors';
import { newPostValidation } from '../../../utils/formValidationRules';
import { fetchRequest } from '../../../utils/requests';
import { getToken } from '../../../utils/utils';
import AddTag from '../../AddTag';

import classes from './NewPost.module.scss';

export const NewPost = () => {
  const { tagList } = useSelector(postsState);

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

  const postArticle = async (article) => {
    const res = await fetchRequest('articles', 'POST', getToken(), article);

    return res;
  };

  const onSubmit = async (data) => {
    const articleData = {
      article: {
        title: data.title,
        description: data.desc,
        body: data.text,
        tagList: tagList ? tagList.map((el) => el.tag) : '',
      },
    };
    await postArticle(articleData);
    goHome();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h4 className={classes.form_title}>Create new article</h4>
      <span>Title</span>
      <input
        type="title"
        className={classNames(classes.input, {
          [classes.red_input]: errors.title,
        })}
        placeholder="Title"
        {...register('title', { ...newPostValidation.title })}
      />
      {errors.title && <p>{errors.title.message}</p>}
      <span>Short description</span>
      <input
        name="desc"
        className={classNames(classes.input, {
          [classes.red_input]: errors.desc,
        })}
        type="title"
        placeholder="Description"
        {...register('desc', { ...newPostValidation.description })}
      />
      {errors.desc && <p>{errors.desc.message}</p>}
      <span>Text</span>
      <textarea
        name="text"
        className={classNames(classes.input, classes.text_input, {
          [classes.red_input]: errors.text,
        })}
        type="text"
        placeholder="Text"
        {...register('text', { ...newPostValidation.text })}
      />
      {errors.text && <p>{errors.text.message}</p>}
      <span>Tags</span>
      <AddTag />
      <input type="submit" value="Send" />
    </form>
  );
};
