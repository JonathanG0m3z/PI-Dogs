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
            state[actualState].sort((a, b)=> {
                if (a.name > b.name) {
                  return type==='ASC'?1:-1;
                }
                if (a.name < b.name) {
                  return type==='ASC'?-1:1;
                }
                return 0;
              });
              return {...state, [dictionary[actualState]]: type,}

        case CHANGE_ORDER_BY_WEIGHT:
            const {filteredW, typeW} = action.payload;
            const actualStateW = filteredW?'filteredBreeds':'breeds';
                state[actualStateW].sort((a, b)=> {
                    if (Number(a.weight.metric.substring(0,2)) > Number(b.weight.metric.substring(0,2))) {
                      return typeW==='upWeight'?1:-1;
                    }
                    if (Number(a.weight.metric.substring(0,2)) < Number(b.weight.metric.substring(0,2))) {
                      return typeW==='upWeight'?-1:1;
                    }
                    return 0;
                  });
                  return {...state, [dictionary[actualStateW]]: typeW,}

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