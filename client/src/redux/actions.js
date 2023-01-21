export const ADD_BREEDS = "ADD_BREEDS";
export const FILTER_BREEDS = "FILTER_BREEDS";

export const addBreeds = (breeds)=>{
    return {type: ADD_BREEDS, payload: breeds};
};

export const filterBreeds = (breeds)=>{
    return {type: FILTER_BREEDS, payload: breeds};
};