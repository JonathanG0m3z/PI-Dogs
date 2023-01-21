import { ADD_BREEDS, FILTER_BREEDS } from "./actions";


const initialState = {
    breeds: [],
    filteredBreeds: [],
}

const rootReducer = (state=initialState,action)=>{
    switch (action.type) {
        case ADD_BREEDS:
            return {
                ...state,
                breeds: action.payload,
            };
        case FILTER_BREEDS:
            return {
                ...state,
                filteredBreeds: action.payload,
            };
    
        default:
            return {...state};
    }
};

export default rootReducer;