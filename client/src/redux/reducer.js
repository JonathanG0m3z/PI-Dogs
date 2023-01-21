import { ADD_BREEDS } from "./actions";


const initialState = {
    breeds: [],
}

const rootReducer = (state=initialState,action)=>{
    switch (action.type) {
        case ADD_BREEDS:
            return {
                ...state,
                breeds: action.payload,
            };
    
        default:
            return {...state};
    }
};

export default rootReducer;