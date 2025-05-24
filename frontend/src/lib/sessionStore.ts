import axios from 'axios';
import { create } from 'zustand';
import { getClientInfo } from './utils';

interface SessionData {
    
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
        gps:string;
        adminId:string


    
    token: string;
}


interface SessionStore {
    data: SessionData | null;
    isLoading: boolean;
    fetchSession: () => Promise<void>;
    logout: () => void;
    isAuthenticated: () => boolean;
    setSession: (session: { name: string, pass: string }) => Promise<void>;
    error: string | null
}


export const useSessionStore = create<SessionStore>((set, get) => ({
    data: null,
    isLoading: true,
    error: null,
    fetchSession: async () => {
        set({ isLoading: true });
        try {

            const token = localStorage.getItem('token');
            const { data:p } = await axios.get<SessionData>(`/api/Session/${token}`);
            set({ data:{...p}, isLoading: false });

        } catch (error) {
            console.error('Error fetching session:', error);
            set({ isLoading: false, error: "Error fetching session" , data:null });
        }
    },
    logout: () => {
        localStorage.removeItem("token")
        set({ data: null });
    },
    isAuthenticated: () => {
        const  token = localStorage.getItem("token")
        return get().data !== null  &&  Boolean(token) ;
    },
    setSession: async (session) => {
        set({ isLoading: true });
        try {
            const clientDeep = await getClientInfo();
            const { data } = await axios.post<SessionData>(`/api/Session`, {
                client:session,
                clientDeep:clientDeep

            });
            console.log(data);
            
            localStorage.setItem('token', data.token);
            set({ data, isLoading: false });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400 && error.response.data?.error?.issues) {
                    const issues = error.response.data.error.issues[0];
                    // Display each issue
                    issues.forEach((issue: any) => {
                        console.error(`${issue.path.join('.')}: ${issue.message}`);
                    });
                    set({ error: issues ?? null })
                } else {
                    console.error('Unhandled error:', error.response?.data || error.message);
                    set({ error: "Invalid data" })
                }
            } else {
                console.error('Non-Axios error:', error);
                set({ error: "something went wrong" })
            }
            set({ isLoading: false });

        }
    },
}))