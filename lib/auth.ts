import axios from '@/lib/axios';

async function getSession() {
  try {
    const response = await axios.get('/auth/session/');
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function register(email: string, password: string) {
  try {
    const response = await axios.post('/auth/register/', {
      email: email,
      password: password,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function signin(email: string, password: string) {
  try {
    const response = await axios.post('/auth/login/', {
      email: email,
      password: password,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export { getSession, register, signin };
