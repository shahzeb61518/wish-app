import React from 'react';


const AddWish = React.lazy(() => import('../pages/Body'))
const Wishes = React.lazy(() => import('../pages/Wishes'))
const Wish = React.lazy(() => import('../pages/Wish'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/addWish', exact: true, name: 'Add Wish', component: AddWish },
    { path: '/wishes', exact: true, name: 'Wishes Page', component: Wishes },
    { path: '/wish', exact: true, name: 'Wish', component: Wish },
];

export default routes;
