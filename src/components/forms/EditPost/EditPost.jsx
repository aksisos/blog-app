import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { postsState } from '../../../redux/selectors/postsSelectors';
import { editPostValidation } from '../../../utils/formValidationRules';
import { fetchRequest } from '../../../utils/requests';
import { getToken } from '../../../utils/utils';
import AddTag from '../../AddTag';

import classes from './EditPost.module.scss';

export const EditPost = () => {
  const { tagList, post } = useSelector(postsState);

  const postValues = {
    title: post && post.article ? post.article.title : null,
    description: post && post.article ? post.article.description : null,
    text: post && post.article ? post.article.body : null,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: postValues,
  });
  
  const navigate = useNavigate();
  const goHome = () => navigate('/');
  const password = useRef({});
  password.current = watch('password', '');

  const editPost = async (data) => {
    const res = await fetchRequest(
      `articles/${post.article.slug}`,
      'PUT',
      getToken(),
      data
    );

    return res;
  };

  const onSubmit = async (data) => {
    const articleData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagList
          ? tagList.map((el) => el.tag)
          : post.article.tagList,
      },
    };

    editPost(articleData);
    goHome();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h4 className={classes.form_title}>Edit article</h4>
      <span>Title</span>
      <input
        type="title"
        className={classNames(classes.input, {
          [classes.red_input]: errors.title,
        })}
        placeholder="Title"
        {...register('title', { ...editPostValidation.title })}
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
        {...register('description', {
          ...editPostValidation.description,
        })}
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
        {...register('text', { ...editPostValidation.text })}
      />
      {errors.text && <p>{errors.text.message}</p>}
      <span>Tags</span>
      <AddTag />
      <input type="submit" value="Send" />
    </form>
  );
};
