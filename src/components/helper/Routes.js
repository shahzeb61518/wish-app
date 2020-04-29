import React from 'react';


const Login = React.lazy(() => import('../pages/User/Login'))
const Signup = React.lazy(() => import('../pages/User/Signup'))
const AddWish = React.lazy(() => import('../pages/Body'))
const Wishes = React.lazy(() => import('../pages/Wishes'))
const Wish = React.lazy(() => import('../pages/Wish'))
const Profile = React.lazy(() => import('../pages/Profile'))

const routes = [
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/signup', exact: true, name: 'Signup', component: Signup },
    { path: '/add-wish', exact: true, name: 'Add Wish', component: AddWish },
    { path: '/wishes', exact: true, name: 'Wishes Page', component: Wishes },
    { path: '/wish', exact: true, name: 'Wish', component: Wish },
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
];

export default routes;
