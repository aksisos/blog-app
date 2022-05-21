import React, { useRef, useState , useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { updateTagList } from '../../redux/actions/postsActions';
import { postsState } from '../../redux/selectors/postsSelectors';

import { AddTagUi } from './AddTagUi';

export const AddTag = () => {
  const [ inputList, setInputList ] = useState([]);

  const { post } = useSelector(postsState);
  const dispatch = useDispatch();

  const location = useLocation();
  const isEdit = location.pathname.split('/').pop() === 'edit';

  const tagList = () => post && isEdit
    ? post.article.tagList.map((el) => ({ tag: el }))
    : [{ tag: '' }];

  const memoTagList = useMemo(tagList, [post, isEdit]);

  const inputRef = useRef(0);

  useEffect(() => {
    setInputList(memoTagList);
  }, [memoTagList]);

  const handleInputChange = (el, index) => {
    const { name, value } = el.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    dispatch(updateTagList(list));
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    updateTagList(list);
  };

  const handleAddClick = () => {
    inputRef.current += 1;
    const list = [...inputList];

    setInputList([...inputList, { tag: '' }]);
    updateTagList(list);
  };

  return (
    <AddTagUi
      handleInputChange={handleInputChange}
      handleRemoveClick={handleRemoveClick}
      handleAddClick={handleAddClick}
      tagList={memoTagList}
      inputList={inputList}
    />
  );
};
