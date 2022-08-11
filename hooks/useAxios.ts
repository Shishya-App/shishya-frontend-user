import React from "react";
import { useEffect, useState } from "react";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import AxiosInstance from "../services/AxiosInstance";

const useAxios = () => {
    const execute = async (params: AxiosRequestConfig) => {
        try {
            const res = await AxiosInstance.request(params)
            return res.data;

        } catch(err) {
            return err as Error;
        }
    }

    return {execute};
};

export default useAxios;