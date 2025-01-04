import { createRouter, createWebHistory } from 'vue-router';

const LandingPage = () => import('../pages/LandingPage.vue');
const Contacts = () => import('../pages/Contacts.vue');
const Events = () => import('../pages/Events.vue');
const Blogs = () => import('../pages/Blogs.vue');
const About = () => import('../pages/About.vue');
const BlogDetail = () => import('../components/BlogDetail.vue');
const EventDetail = () => import('../components/EventDetail.vue');
const ProcessPayment = () => import('../components/ProcessPayment.vue');
const ThankYou = () => import('../pages/ThankYou.vue');
const NotFound = () => import('../pages/NotFound.vue');

const routes = [
    { path: '/', name: 'landing', component: LandingPage },
    { path: '/about', name: 'about', component: About },
    { path: '/contact', name: 'contact', component: Contacts },
    { path: '/blogs', name: 'blogs', component: Blogs },
    { path: '/blog/:slug', name: 'blog-detail', component: BlogDetail },
    { path: '/events', name: 'events', component: Events },
    { path: '/events/event/:eventId', name: 'event-detail', component: EventDetail, props: true },
    { path: '/process-payment/:eventId', name: 'process-payment', component: ProcessPayment, props: true },
    { path: '/payments/verify_payment', name: 'verify-payment', component: ProcessPayment, props: (route) => ({ reference: route.query.reference }) },
    { path: '/thank-you/:transactionId', name: 'thank-you', component: ThankYou, props: true },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
