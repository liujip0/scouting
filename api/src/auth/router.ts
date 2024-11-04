import { router } from '../trpc.ts';
import { login } from './login.ts';

export const authRouter = router({
  login: login
});
