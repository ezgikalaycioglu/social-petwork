import { useEffect, useState } from "react";
import API from "../api";

export default function PetDashboard() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("dog");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  const fetchPets = async () => {
    try {
      const res = await API.get("/pets/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setPets(res.data);
    } catch (err) {
      console.error("Pet listesi alınamadı", err);
    }
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/pets/",
        {
          name,
          species,
          age: age ? parseInt(age) : null,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      setName("");
      setSpecies("");
      await fetchPets(); // tekrar listele
    } catch (err) {
      console.error("Pet eklenemedi", err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
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
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          className="w-full p-2 mb-4 border rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
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
