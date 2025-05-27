import { ActionReducerMap } from "@ngrx/store"
import { authFeatureName, authReducer, AuthState } from "./auth/auth.reducer";
import { counterFeatureName, counterReducer, CounterState } from "./counter/counter.reducer";

export interface RootState {
    [counterFeatureName]: CounterState;
    [authFeatureName]: AuthState;
}

export const rootReducer: ActionReducerMap<RootState> = {
    [counterFeatureName]: counterReducer,
    [authFeatureName]: authReducer,
};

