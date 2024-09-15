import { useState, useContext, useDeferredValue, useMemo, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptPetContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import { Animal } from "./APIResponsesTypes";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "" as Animal,
    breed: "",
  });
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [isPending, startTransition] = useTransition();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(() => <Results pets={deferredPets} />, [deferredPets]);

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          startTransition(() => {
            setRequestParams(obj);
          });
          
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            className="search-input"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={breeds.length === 0}
            className="search-input grayed-out-disabled"
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        {
          isPending ? (
            <div className="flex items-center justify-center p-4">
              <h2 className="text-[100px] animate-spin">🐩</h2>
            </div>
          ) : (
            <button className="color rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
            Submit
          </button>
          )
        } 

      </form>
      {renderedPets}
    </div>
  );
};

export default SearchParams;
