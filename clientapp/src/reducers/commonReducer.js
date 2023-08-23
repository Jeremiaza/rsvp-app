const commonReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.data,
              };
        default:
            return state
    }
}
export const setLoading = (props) => {
    return {
        type: 'SET_LOADING',
        data: props,
    }
}

export default commonReducer