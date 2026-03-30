"use server"
// {
//         "totalRevenue": 3540,
//         "totalMoviesBooked": 6

import { httpClient } from "@/lib/axios/httpClient";

//     }
export interface ITotalEarning {
        
        totalRevenue: number;
        totalMoviesBooked: number;
}
export const totalEarning = async () => {
    const doctors = await httpClient.get<ITotalEarning>('/payment');
    console.log(doctors, "payment server");
    return doctors;
}