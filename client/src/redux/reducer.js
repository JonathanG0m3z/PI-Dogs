import { ADD_BREEDS, FILTER_BREEDS, CHANGE_ORDER, 
    CHANGE_ORDER_BY_WEIGHT, CLEAR_FILTER, SET_FILTERED } from "./actions";
const dictionary = {filteredBreeds: 'orderFiltered', breeds: 'orderAll'};

const initialState = {
    breeds: [],
    filteredBreeds: [],
    orderAll: 'ASC',
    orderFiltered: 'ASC',
    filtered: {isFiltered: false, wanted: ""},
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
        case CHANGE_ORDER:
            const {filtered, type} = action.payload;
            const actualState = filtered?'filteredBreeds':'breeds';
            if(state[dictionary[actualState]]!==type) return {
                ...state,
                [actualState]: state[actualState].reverse(),
                [dictionary[actualState]]: type,
            };
            else return {...state};

        case CHANGE_ORDER_BY_WEIGHT:
            const {filteredW, typeW} = action.payload;
            const actualStateW = filteredW?'filteredBreeds':'breeds';
            if(state[dictionary[actualStateW]]!==typeW) return {
                ...state,
                [actualStateW]: state[actualStateW].reverse(),
                [dictionary[actualStateW]]: typeW,
            };
            else return {...state};
        
        case CLEAR_FILTER:
            return {
                ...state,
                orderFiltered: 'ASC',
            };
        case SET_FILTERED:
            const {isFiltered, wanted} = action.payload;
            return {
                ...state,
                filtered: {...state.filtered, isFiltered, wanted},
            };
    
        default:
            return {...state};
    }
};

export default rootReducer;