import {createAction, props} from '@ngrx/store';

export const selectMonth = createAction('[Overview] select month', props<{month: number}>());
