import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { fetchPets, addPet } from "../api/pet";
import { Pet, PetForm } from "../types";
import {useAuth} from "../context/AuthContext";

export default function PetDashboard() {
  const { accessToken } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);

  const [form, setForm] = useState<PetForm>({
    name: "",
    species: "dog",
    age: "",
    bio: "",
  });

  const getPets = async (accessToken:string) => {
    try {
      const res = await fetchPets(accessToken);
      setPets(res.data);
    } catch (err) {
      console.error("Pets could not be fetched", err);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "age") {
      setForm((prev) => ({
        ...prev,
        age: value === "" ? "" : Number(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddPet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessToken) return;
    console.log("Token gönderiliyor:", accessToken);
    try {
      await addPet(form, accessToken);

      // reset form
      setForm({
        name: "",
        species: "dog",
        age: "",
        bio: "",
      });

      await getPets(accessToken);
    } catch (err) {
      console.error("Pet could not be added", err);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    void getPets(accessToken);
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">My Pets</h1>

      <ul className="mb-6">
        {pets.map((pet) => (
          <li key={pet.id} className="mb-2 p-2 bg-white rounded shadow">
            {pet.name} ({pet.species})
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleAddPet}
        className="bg-white p-4 rounded shadow max-w-md"
      >
        <h2 className="text-lg font-semibold mb-2">Add a new pet</h2>
        <input
          type="text"
          placeholder="Pet name"
          className="w-full p-2 mb-2 border rounded"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select
          name="species"
          value={form.species}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        >
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          placeholder="Age"
          className="w-full p-2 mb-2 border rounded"
          name="age"
          value={form.age}
          onChange={handleChange}
        />

        <textarea
          placeholder="Bio"
          className="w-full p-2 mb-4 border rounded"
          name="bio"
          value={form.bio}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-pink-600 text-black py-2 rounded hover:bg-pink-700 transition"
        >
          Add Pet
        </button>
      </form>
    </div>
  );
}
