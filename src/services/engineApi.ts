import { SERVER_URL } from '@/_constants';
import axios from 'axios';

type SwitchEngineRespType = {
  velocity: number;
  distance: number;
};

type RaceResponseType = {
  success: boolean;
};

// const url = new URL('/engine',SERVER_URL)
axios.defaults.baseURL = SERVER_URL;

const fetchEngine: <T>(id: number, status: 'started' | 'stopped' | 'drive') => Promise<T> = async (
  id,
  status
) => {
  // const response = await fetch(url,{method:"PATCH"})
  return (
    await axios.patch('/engine', null, {
      params: { id, status },
    })
  ).data;
};

export const startEngine = (id: number) => fetchEngine<SwitchEngineRespType>(id, 'started');

export const startRace = (id: number) => fetchEngine<RaceResponseType>(id, 'drive');

export const stopEngine = (id: number) => fetchEngine<SwitchEngineRespType>(id, 'stopped');
