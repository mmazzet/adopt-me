import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptPetContext";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import { PetAPIResponse } from "./APIResponsesTypes";

const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Why did you not give me an id. I wanted an id. I have no id.");
  }
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <h2 className="animate-spin text-[34px]">🌀</h2>
      </div>
    );
  }
  const pet = results.data.pets[0];

  return (
    <div className="details w-[1100px] mx-auto p-4 mb-6 rounded-lg bg-[#faeff0] shadow-[0_0_12px_rgba(170,170,170,0.5),_0_0_12px_rgba(255,255,255,0.5)]">
      <Carousel images={pet.images} />
      <div >
      <h1 className="text-center text-[#333] text-6xl my-1">{pet.name}</h1>
      <h2 className="text-center my-1 mb-5">
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)} className="block mt-2 bg-blue-500 text-white px-4 py-2 rounded mx-auto">Adopt {pet.name}</button>
          <p className="leading-relaxed px-4">{pet.description}</p>
          {showModal ? (
            <Modal>
              <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-90">
                <div className="max-w-[500px] rounded-[30px] bg-[#faeff0] p-4 text-center">
                  <h1 className="mb-4 text-lg font-semibold">
                    Would you like to adopt {pet.name}?
                  </h1>
                  <div className="buttons">
                    <button
                      className="mr-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      onClick={() => {
                        setAdoptedPet(pet);
                        navigate("/");
                      }}
                    >
                      Yes
                    </button>
                    <button
                      className="inline-block rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
                      onClick={() => setShowModal(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
