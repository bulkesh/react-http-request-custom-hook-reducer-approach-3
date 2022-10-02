import { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

const ACTIONS = {
    API_REQUEST: 'api-request',
    FETCH_DATA: 'fetch-data',
    ERROR: 'error'
}
const initialState = {
    loading: false,
    error: null,
    data: []
}

//{type,payload} = action
const recuder = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.API_REQUEST:
            return { ...state, loading: true, data: [], error: null };
        case ACTIONS.FETCH_DATA:
            return { ...state, loading: false, data: payload, error: null };
        case ACTIONS.ERROR:
            return { ...state, loading: false, data: [], error: payload };
        default:
            return state;
    }
}
const useHttp = (url) => {
    const [state, dispatch] = useReducer(recuder, initialState);

    useEffect(() => {
        dispatch({ type: ACTIONS.API_REQUEST });
        axios.get(url).then((response) => {
            dispatch({ type: ACTIONS.FETCH_DATA, payload: response.data });
        }).catch((err) => {
            dispatch({ type: ACTIONS.ERROR, payload: err.error });
        });


    }, [url])
    return state;
}

export default useHttp;