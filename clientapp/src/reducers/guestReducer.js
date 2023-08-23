const guestReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GUEST':
            return [
                ...action.data,
            ];
        case 'SET_ACCEPTED':
            let guests = state
            guests[action.data.index].accepted = action.data.accepted;
            return [
                ...guests

            ]
        case 'SET_DIET':
            let guests2 = state
            guests2[action.data.index] = {
                ...guests2[action.data.index],
                ...action.data.diet
            }
            return [
                ...guests2
            ]
        default:
            return state
    }
}

export const setCurrentGuest = (props) => {
    return {
        type: 'SET_GUEST',
        data: props,
    }
}

export const setAccepted = (props) => {
    return {
        type: 'SET_ACCEPTED',
        data: props,
    }
}

export const setDietaryRestrictions = (props) => {
    return {
        type: 'SET_DIET',
        data: props,
    }
}
export default guestReducer