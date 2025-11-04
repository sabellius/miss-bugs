import { bugService as bugServiceLocal } from './bug-service-local';
import { bugService as bugServiceRemote } from './bug-service-remote';

const isRemote = import.meta.env.VITE_USE_REMOTE === 'true' || true;
export const bugService = isRemote ? bugServiceRemote : bugServiceLocal;
