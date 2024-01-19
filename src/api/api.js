import axios from "axios";

const BASE_URL="https://bemillionare.xyz/task/api/"


export const fetchDataFromApi=async (url,params)=>{
    try {
        const {data}=await axios.post(BASE_URL+url,
            
            params
        )

        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

