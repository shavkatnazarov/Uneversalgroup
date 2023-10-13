export const ifStatus = (status) => {
    return status === 200 || status === 201 || status === 204;
}

export const isAuthenticated = (token) => {
    return token;
}