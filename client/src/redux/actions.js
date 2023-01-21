export const ADD_BREEDS = "ADD_BREEDS";

export const addBreeds = (breeds)=>{
    return {type: ADD_BREEDS, payload: breeds};
};