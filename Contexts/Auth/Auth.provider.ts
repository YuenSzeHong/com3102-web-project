import jwt from "jsonwebtoken";
import { useSetState } from "react-use";
import axios from "axios";
import { secret } from "../../lib/secret";

export type AuthState = {
    user: string;
    token: string;
    role: string;
    loggedIn: boolean;
    loading: boolean;
    error: string | string[] | null;
};
export const initialState = {
    user: '',
    token: '',
    role: '',
    loggedIn: false,
    loading: false,
    error: null,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useSetState<AuthState>(initialState);
    const setLoggedIn = (loggedIn: boolean) => setState({ loggedIn });
    const setToken = (token: string) => setState({ token });
    const setUser = (user: string) => setState({ user });
    const setRole = (role: string) => setState({ role });
    const setLoading = (loading: boolean) => setState({ loading });
    const setError = (error: string | string[] | null) => setState({ error });

    const login = (username: string, password: string) => {
        setLoading(true);
        setError(null);
        axios.post("/api/auth/login", { username, password })
            .then(res => {
                const { token } = res.data;
                // decode token to get user and role
                const { user, role } = jwt_decode(token);
                setToken(token);
                setUser(user);
                setRole(role);
                setLoggedIn(true);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError(err.response.data.message);
            });
    };

    const logout = () => {
        setLoading(true);
        setError(null);
        axios.post("/api/auth/logout")
            .then(res => {
                setToken('');
                setUser('');
                setRole('');
                setLoggedIn(false);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError(err.response.data.message);
            });
    }
    async function jwt_decode(token: any): any {
        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                return null;
            }
            return decoded;
        });
    }
};