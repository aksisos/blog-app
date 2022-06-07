export const editProfileValidation = {
  username: {
    required: 'Enter username',
    minLength: {
      value: 3,
      message: 'Username must have at least 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Username must be at most 20 characters long',
    },
  },

  email: {
    required: 'Enter email',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Must be a valid email',
    },
  },

  password: {
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Password must be at most 40 characters long',
    },
  },

  url: {
    pattern: {
      value: /^(http|https):\/\/[^ "]+$/,
      message: 'Must be a valid url',
    },
  },
};

export const postFormValidation = {
  title: {
    required: 'Enter title',
  },

  description: {
    required: 'Enter description',
  },

  text: {
    required: 'Enter description',
  },
};

export const signUpValidation = {
  username: {
    required: 'Enter username',
    minLength: {
      value: 3,
      message: 'Username must have at least 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Username must be at most 20 characters long',
    },
  },
  email: {
    required: 'Enter email',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Must be a valid email',
    },
  },
  password: {
    required: 'Enter password',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Password must be at most 40 characters long',
    },
  },
};

export const signInValidation = {
  email: {
    required: 'Enter email',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Must be a valid email',
    },
  },
  password: {
    required: 'Enter password',
  },
};
