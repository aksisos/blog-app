import React from 'react';

import classes from './Tags.module.scss';

export const Tags = ({ tagList }) => {
  let counter = 0;

  return tagList.map((tag) => {
    counter += 1;
    const key = `${counter}_${tag}_${new Date().getTime()}`;
    return (
      tag && (
        <div className={classes.tag} key={key}>
          {tag}
        </div>
      )
    );
  });
};
