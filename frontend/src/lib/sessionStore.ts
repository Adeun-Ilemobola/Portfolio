import axios from 'axios';
import { create } from 'zustand';

interface SessionData {
    data: {
        id: string;
        name: string;
        date: string;
        ip: string;
        timezone: string;
        browser: string;
        os: string;
        device: string;
        country: string;
        city: string;
        region: string;
       
    };
    token: string;
}


interface SessionStore {
  data: SessionData | null;
  isLoading: boolean;
  fetchSession: () => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  setSession: (session: {name:string , pass:string}) => Promise<void>;
}


export const useSessionStore = create<SessionStore>((set , get) =>({
    data: null,
    isLoading: true,
    fetchSession: async () => {
        set({ isLoading: true });
        try {

            const token = localStorage.getItem('token');
            const { data } = await axios.get<SessionData>(`/api/session/${token}`);
            set({ data, isLoading: false });
           
        } catch (error) {
            console.error('Error fetching session:', error);
            set({ isLoading: false });
        }
    },
    logout: () => {
        set({ data: null });
    },
    isAuthenticated: () => {
        return get().data !== null;
    },
    setSession: async (session) => {
        set({ isLoading: true });
        try {
            const { data } = await axios.post<SessionData>(`/api/session`, session);
            localStorage.setItem('token', data.token);
            set({ data, isLoading: false });
        } catch (error) {
            console.error('Error setting session:', error);
            set({ isLoading: false });
            
        }
    },
}) )