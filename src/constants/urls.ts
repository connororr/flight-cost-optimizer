// Constants.js
const production = {
    url: 'https://exploria-api.xyz',
};
const development = {
    url: 'http://localhost:3001',
};
export const config =
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
        ? development
        : production;
