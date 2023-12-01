const queerantatre = {
  name: 'Queerantatre',
  categories: {
    name: 'Categorie',
    href: '/admin/queerantatre/categories'
  },
  questions: {
    name: 'Domande',
    href: '/admin/queerantatre/questions'
  }
};

const campaign = {
  name: 'Campagna',
  knights: {
    name: 'Cavalieri',
    href: '/admin/campaign/knights'
  },
  quests: {
    name: 'Avventure',
    href: '/admin/campaign/quests'
  }
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
  campaign,
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
