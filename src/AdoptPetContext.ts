import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[Pet, (adoptedPet: Pet) => void]>([
    {
        id: 1337,
        name: "Fido",
        animal: "dog",
        description: "lLorem ipsum",
        breed: "Beagle",
        images: [],
        city: "Seattle",
        state: "WA",
    },
    () => {},
]);

export default AdoptedPetContext;