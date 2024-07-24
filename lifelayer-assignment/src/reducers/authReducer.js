export const authReducer = (auth, action) => {
    switch (action.type) {
        case 'login': {
            return {_id: action.user._id, name: action.user.name, mobile: action.user.mobile, email: action.user.email}
        }
        case 'logout': {
           return {name: '', email: '', mobile: ''}
        }
        case 'notauthenticated' : {
            return {name: '', email: '', mobile: ''}
        }
        default:
        return auth;
    }
}