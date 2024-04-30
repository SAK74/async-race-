import { SERVER_URL } from '@/_constants';
import { useCreateWinnerMutation, useUpdateWinnerMutation } from '@/store';
import { Winner } from '@/types';
import axios from 'axios';

axios.defaults.baseURL = SERVER_URL;

export const useAddwinner = () => {
  const [updateWinner] = useUpdateWinnerMutation();
  const [createWinner] = useCreateWinnerMutation();

  return async (winner: Omit<Winner, 'wins'>) => {
    try {
      const { id, time, wins } = (await axios.get<Winner>(`/winners/${winner.id}`)).data;
      updateWinner({ id, wins: wins + 1, time: Math.min(time, winner.time) });
    } catch {
      createWinner({ wins: 1, time: winner.time });
    }
  };
};
