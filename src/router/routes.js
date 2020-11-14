
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/PageHome.vue') },
      { path: '/camera', component: () => import('pages/PageCamera.vue') },
      { name: 'searchresult', path: '/trackerlist/:search', component: () => import('pages/trackerlist.vue') },
      { path: '/trackerlist', component: () => import('pages/trackerlist.vue') },
      { path: '/login', component: () => import('pages/UserLogin.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'login', name: 'Login', component: () => import('pages/Auth')},
      { path: 'forgotPassword', name: 'ForgotPassword', component: () => import('pages/ForgotPassword.vue')}
    ]
  }
  ]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue')
})

export default routes
