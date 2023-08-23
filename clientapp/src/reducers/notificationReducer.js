const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                ...state,
                ...action.data
            }
        case 'CLEAR_NOTIFICATION':
            return {}
        default:
            return state
    }
}
export const setNotification = (props) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            message: props.message,
            notificationType: props.notificationType
        },
    }
}
export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
    }
}
export default notificationReducer