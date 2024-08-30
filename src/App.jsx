import {createRoot} from "react-dom/client";
import SearchParams from "./SearchParams";



const App = () => {
  return ( 
    <div>
      <h1>Adopt Me!</h1>
{/*       <Pet name="Luna" animal="dog" breed="Havanese"/>
      <Pet name="Pepper" animal="bird" breed="Cockatiel"/>
      <Pet name="Doink" animal="cat" breed="Mixed"/> */}
      <SearchParams />
    </div>
   );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
