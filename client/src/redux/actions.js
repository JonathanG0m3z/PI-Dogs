export const ADD_BREEDS = "ADD_BREEDS";
export const FILTER_BREEDS = "FILTER_BREEDS";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const CHANGE_ORDER_BY_WEIGHT = "CHANGE_ORDER_BY_WEIGHT";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const SET_FILTERED = "SET_FILTERED";
export const ADD_FILTER_BY_TEMPERAMENT = "ADD_FILTER_BY_TEMPERAMENT";
export const DELETE_ALL = "DELETE_ALL";
export const FILTER_BY_DATA_SOURCE = "FILTER_BY_DATA_SOURCE";

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

export const addFilterByTemperament = (temperamentId)=>{
    return {type: ADD_FILTER_BY_TEMPERAMENT, payload: temperamentId};
};

export const deleteAll = ()=>{
    return {type: DELETE_ALL};
};
export const filterByDataSource = (dataSource)=>{
    return {type: FILTER_BY_DATA_SOURCE, payload: dataSource};
};