
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/PageHome.vue') },
      { path: 'searcher', component: () => import('pages/PageSearch.vue') },
      { name: 'searchresult', path: '/searcher/:search', component: () => import('pages/PageSearch.vue') },
      { path: 'watchlist', component: () => import('pages/Watchlist.vue'), meta: {requiresAuth: true}},
      { path: 'watchedlist', component: () => import('pages/Watchedlist.vue'), meta: {requiresAuth: true}},
      { path: 'profile', component: () => import('pages/Profile.vue'), meta: {requiresAuth: true}},
      { path: 'movie', component: () => import('pages/Moviepage.vue') },
      { name: 'searchidresult', path: '/movie/:idsearch', component: () => import('pages/Moviepage.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: 'forgotPassword',
        name: 'ForgotPassword',
        component: () => import('pages/ForgotPassword.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Auth.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Auth.vue')
      }
    ]
  }
  ]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue')
})

export default routes
