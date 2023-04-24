import { User } from 'src/app/dto/user.model';

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export function AuthReducer(state, action) {
  return state;
}
