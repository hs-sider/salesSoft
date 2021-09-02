import {Router} from 'express';

import auth from './auth';
import user from './user';
import product from './product';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/products', product);

export default routes;

// localhost:3000/auth/login
// localhost:3000/users