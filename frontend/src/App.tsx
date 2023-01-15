import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants";

import { Home } from "./domains/Home/Home";
import { AddPublicToilet } from "./domains/AddPublicToilet/AddPublicToilet";
import { Login } from "./domains/Login/Login";
import { Registration } from "./domains/Registration/Registration";
import { PublicToilets } from "./domains/PublicToilets/PublicToilets";
//TODO should we contain 2 different components inside one folder? plural/singular name conflict?
import { PublicToilet } from "./domains/PublicToilets/PublicToilet";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ADD_PUBLIC_TOILET} element={<AddPublicToilet />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.PUBLIC_TOILETS} element={<PublicToilets />} />
        <Route path={ROUTES.PUBLIC_TOILET} element={<PublicToilet />} />
      </Routes>
    </div>
  );
}

export default App;
