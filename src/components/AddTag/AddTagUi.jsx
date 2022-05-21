import React from 'react';

import classes from './AddTag.module.scss';

export const AddTagUi = ({
  inputList,
  handleAddClick,
  handleInputChange,
  handleRemoveClick,
}) => (
  <div className="tags">
    {inputList.map((item, i) => {
      const key = i;
      return (
        <div className={classes.input_tag} key={key}>
          <input
            name="tag"
            placeholder="Enter tag"
            value={item.tag}
            onChange={(el) => handleInputChange(el, i)}
          />
          <div className={classes.btn_box}>
            {inputList.length !== 1 && (
              <button
                type="button"
                className={classes.delete_tag_button}
                onClick={() => handleRemoveClick(i)}>
              Remove
              </button>
            )}
            {inputList.length - 1 === i && (
              <button
                className={classes.add_tag_button}
                onClick={handleAddClick}
                type="button">
              Add
              </button>
            )}
          </div>
        </div>
      );
    })}
  </div>
);
