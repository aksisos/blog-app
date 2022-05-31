/* eslint-disable react/prop-types */
import React from 'react';

import classes from './PopUp.module.scss';

export const PopUp = ({ deletePost, closeModal }) => (
  <div className={classes.modal}>
    <div className={classes.modal_arrow} />
    <div>Are you sure to delete this article?</div>
    <div className={classes.buttons_wrapper}>
      <button type="button" onClick={closeModal}>
                No
      </button>
      <button type="button" onClick={deletePost}>
                Yes
      </button>
    </div>
  </div>
);
