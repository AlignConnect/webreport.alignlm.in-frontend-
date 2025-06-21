import axios, { AxiosInstance } from 'axios'
import { HandleGlobalError } from './handleGlobalError';

export class ApiService {


    private static axiosInstance: AxiosInstance;


    static getInstance(token?: string) {


        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });


        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {

                if (error.response?.status === 401) {
                    HandleGlobalError(error)
                }



                return Promise.reject(error);
            }
        );


        return this.axiosInstance


        // this.axiosInstance.interceptors.request.use((config) => {
        //     const token = localStorage.getItem('token')
        //     if (token) {
        //         config.headers['Authorization'] = `Bearer ${token}`
        //     }
        //     return config
        // })

    }








}