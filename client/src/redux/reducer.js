import { ADD_BREEDS, FILTER_BREEDS, CHANGE_ORDER, 
    CHANGE_ORDER_BY_WEIGHT, CLEAR_FILTER, SET_FILTERED,
    ADD_FILTER_BY_TEMPERAMENT, 
    DELETE_ALL,
    FILTER_BY_DATA_SOURCE} from "./actions";
const dictionary = {filteredBreeds: 'orderFiltered', breeds: 'orderAll'};

const initialState = {
    breeds: [],
    filteredBreeds: [],
    orderAll: 'ASC',
    orderFiltered: 'ASC',
    filtered: {isFiltered: false, wanted: ""},
    filterByTemperament: ['All'],
    filterByDataSource: ['api','db'],
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
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return type==='ASC'?1:-1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return type==='ASC'?-1:1;
                }
                return 0;
              });
              return {...state, [dictionary[actualState]]: type,}

        case CHANGE_ORDER_BY_WEIGHT:
            const {filteredW, typeW} = action.payload;
            const actualStateW = filteredW?'filteredBreeds':'breeds';
                state[actualStateW].sort((a, b)=> {
                    let aNum = Number(a.weight.imperial.substring(0,3).replace(/[^0-9]+/g, ""));
                    let bNum = Number(b.weight.imperial.substring(0,3).replace(/[^0-9]+/g, ""));
                    if(aNum===0) aNum = a.weight.imperial.replace(/[^0-9]+/g, "");
                    if(bNum===0) bNum = b.weight.imperial.replace(/[^0-9]+/g, "");
                    if (aNum > bNum) {
                      return typeW==='upWeight'?1:-1;
                    }
                    if (aNum < bNum) {
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

        case ADD_FILTER_BY_TEMPERAMENT:
            if(state.filterByTemperament.some(
                (temperament)=>action.payload===temperament
            )){
                return {...state,
                    filterByTemperament: state.filterByTemperament.filter(
                            element=>element!==action.payload
                        )
                }
            }else{
                state.filterByTemperament.push(action.payload);
                return {...state};
            }

        case DELETE_ALL:
                return{...state,
                filterByTemperament:  []
                }

        case FILTER_BY_DATA_SOURCE:
            if(state.filterByDataSource.some(
                (dataSource)=>action.payload===dataSource
            )){
                return {...state,
                    filterByDataSource: state.filterByDataSource.filter(
                            element=>element!==action.payload
                        )
                }
            }else{
                state.filterByDataSource.push(action.payload);
                return {...state};
            }
                
        default:
            return {...state};
    }
};

export default rootReducer;