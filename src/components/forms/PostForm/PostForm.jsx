import classNames from 'classnames';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { falseEdit } from '../../../redux/actions/clientActions';
import { postsState } from '../../../redux/selectors/postsSelectors';
import { clientState } from '../../../redux/selectors/clientSelectors';
import { postFormValidation } from '../../../utils/formValidationRules';
import { BlogService } from '../../../services/blogService';
import AddTag from '../../AddTag';

import classes from './PostForm.module.scss';

const blogService = new BlogService();

export const PostForm = () => {
  const dispatch = useDispatch();
  const { isEdit } = useSelector(clientState);

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

  const postArticle = async (article) => {
    const res = await blogService.setPostArticle(article);

    return res;
  };

  const editPost = async (data) => {
    const res = await blogService.setEditPost(data, post.article.slug);

    return res;
  };

  const onSubmit = async (data) => {
    const articleData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagList ? tagList.map((el) => el.tag) : post.article.tagList,
      },
    };
    isEdit ? editPost(articleData) : await postArticle(articleData);
    dispatch(falseEdit());
    goHome();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {isEdit ? <h4 className={classes.form_title}>Edit article</h4> : <h4 className={classes.form_title}>Create new article</h4>}
      <span>Title</span>
      <input
        type="title"
        className={classNames(classes.input, {
          [classes.red_input]: errors.title,
        })}
        placeholder="Title"
        {...register('title', { ...postFormValidation.title })}
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
        {...register('description', { ...postFormValidation.description })}
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
        {...register('text', { ...postFormValidation.text })}
      />
      {errors.text && <p>{errors.text.message}</p>}
      <span>Tags</span>
      <AddTag />
      <input type="submit" value="Send" />
    </form>
  );
};
