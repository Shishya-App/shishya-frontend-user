import React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import AxiosInstance from "../services/AxiosInstance";

const useAxios = () => {
    const execute = async (params: AxiosRequestConfig) => {
        try {
            const res = await AxiosInstance.request(params)
            return {
                isErr: false,
                res: res.data
            };

        } catch(err) {
            console.log(JSON.stringify(err));
            return {
                isErr: true,
                res: err as Error
            }
        }
    }

    return {execute};
};

export default useAxios;