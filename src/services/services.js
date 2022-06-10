import { getToken } from '../utils/utils';

export const URLjpg = 'https://static.productionready.io/images/smiley-cyrus.jpg';

export class Service {
  apiUrl ='https://kata.academy:8021/api/';

  fetchRequest = async (link, method, auth, body) => {
    const res = await fetch(`${this.apiUrl}${link}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${auth}`,
      },
      body: JSON.stringify(body),
    });
    return res;
  };

  fetchRequestt = async (link, options = {}) => {
    const res = await fetch(`${this.apiUrl}${link}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${getToken()}`,
      },
      ...options
    });
    return res;
  };

  editProfileFetch = async (data) => {
    const body = JSON.stringify(data);
    const method = 'PUT';
    const options = {method, body};

    const res = await this.fetchRequestt('user', options);
    return res;
  };

  editPostFetch = async (data, slug) => {
    const body = JSON.stringify(data);
    const method = 'PUT';
    const options = {method, body};

    const res = await this.fetchRequestt(`articles/${slug}`, options);
    return res;
  };

  postArticleFetch = async (data) => {
    const body = JSON.stringify(data);
    const method = 'POST';
    const options = {method, body};

    const res = await this.fetchRequestt('articles', options);
    return res;
  };

  deletePostFetch = async (slug) => {
    const method = 'DELETE';

    const res = await this.fetchRequestt(`articles/${slug}`, {method});
    return res;
  };

  getPostsFetch = async (page) => {
    const method = 'GET';

    const res = await this.fetchRequestt(`articles?limit=5&offset=${(page - 1) * 5}`, {method});
    return res;
  };

  getFullPostFetch = async (slug) => {
    const method = 'GET';

    const res = await this.fetchRequestt(`articles/${slug}`, {method});
    return res;
  };

  favoriteArticleFetch = async (slug) => {
    const method = 'POST';

    const res = await this.fetchRequestt(`articles/${slug}/favorite`, {method});
    return res;
  };

  unfavoriteArticleFetch = async (slug) => {
    const method = 'DELETE';

    const res = await this.fetchRequestt(`articles/${slug}/favorite`, {method});
    return res;
  };

  logUser = async (formData) => {
    const method = 'POST';
    const res = await fetch(`${this.apiUrl}users/login`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formData),
    });
    return res;
  };

  regUser = async (formData) => {
    const method = 'POST';
    const res = await fetch(`${this.apiUrl}users`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formData),
    });
    return res;
  };

}
