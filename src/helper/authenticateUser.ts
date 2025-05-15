function authenticateUser(){
    const token = window.localStorage.getItem('token')
    return token ? 1 : 0 
}


export {authenticateUser}