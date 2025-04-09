import { create } from "zustand";
import { setCookie, getCookie } from "cookies-next";

interface AuthState {
  user: { name: string; email: string; _id: string } | null;
  token: string | null;
  setUser: (user: { name: string; email: string; _id: string }) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

interface userdetail {
  _id: string;
  email: string;
  name: string;
}

interface AllUserState {
  AllUser: userdetail[] | null;
  setAlluser: (AllUser: userdetail[]) => void;
}

export const useAllUserStore = create<AllUserState>((set) => ({
  AllUser: null,

  setAlluser: (AllUser) => {
    set({ AllUser });
  },
}));

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => {
    set({ user });
    setCookie("user", JSON.stringify(user), { path: "/" });
  },
  setToken: (token) => {
    set({ token });
    setCookie("jwt", token, { path: "/" });
  },
  logout: () => {
    set({ user: null, token: null });
    setCookie("user", "", { path: "/", maxAge: -1 });
    setCookie("jwt", "", { path: "/", maxAge: -1 });
  },
}));

export const hydrateAuthState = () => {
  const storedUser = getCookie("user");
  const storedToken = getCookie("jwt");

  if (storedUser && storedToken) {
    useAuthStore.getState().setUser(JSON.parse(storedUser as string));
    useAuthStore.getState().setToken(storedToken as string);
  }
};
