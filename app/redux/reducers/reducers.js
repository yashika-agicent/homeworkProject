const initialState = {
    favorites: []
};

export default favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            return {
                ...state,
                user: [...state.user, action.payload]
            };
        case "DELETE_FAVORITE":
            return {
                users: [
                    ...state.user.filter(user => user !== action.payload)
                ]
            };
            default:
                return state;
    }
}