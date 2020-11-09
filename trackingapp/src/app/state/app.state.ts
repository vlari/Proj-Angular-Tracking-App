import { AuthState } from '../auth/state/auth.reducer';
import { OrderState } from '../order/state/order.reducer';

export interface State {
  user: AuthState;
  order: OrderState;
}
