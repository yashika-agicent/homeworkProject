export const addFavorite = user => ({
    type: "ADD_FAVORITE",
    payload: user
});

export const deleteFavorite = user => ({
    type: "DELETE_FAVORITE",
    payload: user
});