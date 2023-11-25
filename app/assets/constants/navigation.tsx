const queerantatre = {
  categories: {
    name: 'Categorie',
    href: '/admin/queerantatre/categories'
  },
  questions: {
    name: 'Domande',
    href: '/admin/queerantatre/questions'
  }
};

const quests = {
  name: 'Avventurieri',
  href: '/admin/quests'
};

const users = {
  name: 'Utenti',
  href: '/admin/users'
};

export const home = { name: 'Home', href: '/' };
export const admin = {
  name: 'Admin',
  href: '/admin',
  queerantatre,
  quests,
  users
};

export const login = { name: 'Login', href: '/users/login' };
export const register = { name: 'Register', href: '/users/register' };

const pages = {
  home,
  admin,
  login,
  register
};

export default pages;
