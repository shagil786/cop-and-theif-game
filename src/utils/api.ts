import axios from "axios";

let baseUrl = 'https://cop-and-thief-backend.onrender.com/api/v1';

export const getCities = () => axios.get(`${baseUrl}/cities`).then(({ data }) => data);

export const getVechiles = () => axios.get(`${baseUrl}/vechiles`).then(({ data }) => data);

export const checkCapture = (cop1: any, cop2: any, cop3: any) => axios.post(`${baseUrl}/capture`, { cop1, cop2, cop3 }).then(({ data }) => data);