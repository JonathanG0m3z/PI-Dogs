export const ADD_BREEDS = "ADD_BREEDS";
export const FILTER_BREEDS = "FILTER_BREEDS";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const CHANGE_ORDER_BY_WEIGHT = "CHANGE_ORDER_BY_WEIGHT";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const SET_FILTERED = "SET_FILTERED";

export const addBreeds = (breeds)=>{
    return {type: ADD_BREEDS, payload: breeds};
};

export const filterBreeds = (breeds)=>{
    return {type: FILTER_BREEDS, payload: breeds};
};

export const changeOrder = (filtered,type)=>{
    return {type: CHANGE_ORDER, payload: {filtered, type}};
};

export const changeOrderByWeight = (filteredW,typeW)=>{
    return {type: CHANGE_ORDER_BY_WEIGHT, payload: {filteredW, typeW}};
};

export const clearFilterRedux = ()=>{
    return {type: CLEAR_FILTER};
};

export const setFiltered = (isFiltered, wanted="")=>{
    return {type: SET_FILTERED, payload: {isFiltered, wanted}};
};