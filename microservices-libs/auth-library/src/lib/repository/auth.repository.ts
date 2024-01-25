import { authEntity } from '../entity/entity.container/auth.entity';
export const AuthRepo = [
  {
    provide: 'AUTH_REPO',
    useValue: authEntity,
  },
];
