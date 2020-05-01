import * as ActionType from './ActionTypes';

export const favorites = (state = [], action) => {
    switch(action.ActionType){
        case ActionType.ADD_FAVORITE:
            if(state.some(el => el===action.payload))
                return state;
            else
                return (state.concat(action.payload));
        default:
            return state;
    }

}