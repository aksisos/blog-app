import { getToken } from '../utils/utils';

export const URLjpg = 'https://static.productionready.io/images/smiley-cyrus.jpg';

export class BlogService {
  apiUrl ='https://kata.academy:8021/api/';

  fetchRequestAunt = async (link, options = {}) => {
    const res = await fetch(`${this.apiUrl}${link}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      ...options
    });
    const json = await res.json();
    return json;
  };

  fetchRequest = async (link, options = {}) => {
    const res = await fetch(`${this.apiUrl}${link}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${getToken()}`,
      },
      ...options
    });
    const json = await res.json();
    return json;
  };

  setEditProfile = async (data) => {
    const body = JSON.stringify(data);
    const method = 'PUT';
    const options = {method, body};

    const res = await this.fetchRequest('user', options);
    return res;
  };

  setEditPost = async (data, slug) => {
    const body = JSON.stringify(data);
    const method = 'PUT';
    const options = {method, body};

    const res = await this.fetchRequest(`articles/${slug}`, options);
    return res;
  };

  setPostArticle = async (data) => {
    const body = JSON.stringify(data);
    const method = 'POST';
    const options = {method, body};

    const res = await this.fetchRequest('articles', options);
    return res;
  };

  setDeletePost = async (slug) => {
    const method = 'DELETE';

    const res = await this.fetchRequest(`articles/${slug}`, {method});
    return res;
  };

  getPosts = async (page) => {
    const method = 'GET';

    const res = await this.fetchRequest(`articles?limit=5&offset=${(page - 1) * 5}`, {method});
    return res;
  };

  getFullPost = async (slug) => {
    const method = 'GET';

    const res = await this.fetchRequest(`articles/${slug}`, {method});
    return res;
  };

  setFavoriteArticle = async (slug) => {
    const method = 'POST';

    const res = await this.fetchRequest(`articles/${slug}/favorite`, {method});
    return res;
  };

  setUnfavoriteArticle = async (slug) => {
    const method = 'DELETE';

    const res = await this.fetchRequest(`articles/${slug}/favorite`, {method});
    return res;
  };

  getUserByToken = async () => {
    const method = 'GET';

    const res = await this.fetchRequest('user', {method});
    return res;
  };

  setRegister = async (formData) => {
    const body = JSON.stringify(formData);
    const method = 'POST';
    const options = {method, body};
    
    const res = await this.fetchRequestAunt('users', options);
    return res;
  };

  setLogin = async (formData) => {
    const body = JSON.stringify(formData);
    const method = 'POST';
    const options = {method, body};
    
    const res = await this.fetchRequestAunt('users/login', options);
    return res;
  };

}
