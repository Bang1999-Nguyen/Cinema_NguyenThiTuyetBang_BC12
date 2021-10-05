import { EDIT_USER } from "./types";


  
  const initialState = {
    user: [],
    selectedKey:'1'
  };
  
  const UserAdmin = (state = initialState, { type, payload }) => {
    switch (type) {
      case EDIT_USER:
        return { ...state, user: payload }
        case 'TAB_ADMIN':
          return { ...state, selectedKey:payload}
      default:
        return state;
    }
  };
  
  export default UserAdmin;