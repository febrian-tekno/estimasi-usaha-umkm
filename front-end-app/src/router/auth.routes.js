// src/router/auth.routes.js
import SignInPage from '../views/auth/LoginPage.vue';
import RegisterPage from '../views/auth/RegisterPage.vue';
import VerifyEmailPage from '../views/auth/VerifyEmailPage.vue';
import ResetPasswordPage from '../views/auth/ResetPasswordPage.vue';

export default [
  {
    path: '/auth/login',
    component: SignInPage,
  },
  {
    path: '/auth/register',
    component: RegisterPage,
  },
  {
    path: '/auth/email-verify',
    component: VerifyEmailPage,
  },
  {
    path: '/auth/reset-password',
    component: ResetPasswordPage,
  },
];
