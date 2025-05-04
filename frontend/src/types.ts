export type AuthContextType = {
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export type AuthCredentials = {
  username: string;
  password: string;
  email?: string; // only in signup
};

export type AuthResponse = {
  access: string;
  refresh: string;
};

export type AuthFormProps = {
  mode?: "login" | "signup";
  onSubmit: (data: AuthCredentials) => void;
};

export type Pet = {
  id: number;
  name: string;
  species: string;
  age: number | null;
  bio: string;
};

export type PetForm = {
  name: string;
  species: string;
  age: number | "";
  bio: string;
};
