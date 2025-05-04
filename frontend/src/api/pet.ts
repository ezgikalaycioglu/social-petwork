import API from "./api";
import { Pet, PetForm } from "../types";

export const fetchPets = (token: string) => {
  return API.get<Pet[]>("/pets/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addPet = (form: PetForm, token: string) => {
  return API.post<Pet>(
    "/pets/",
    {
      ...form,
      age: form.age === "" ? null : Number(form.age),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
