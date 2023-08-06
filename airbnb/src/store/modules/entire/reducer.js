import * as actionTypes from './constants'

const initialState = {
    currentPage: 1,
    roomList: [],
    total: 0,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_CURRENT_PAGE:
            return  {...state, currentPage: action.currentPage}
        case actionTypes.CHANGE_ROOM_LIST:
            return  {...state, roomList: action.roomList}
        case actionTypes.CHANGE_TOTAL:
            return  {...state, total: action.total}
        default: 
            return state
    }
}

export default reducer