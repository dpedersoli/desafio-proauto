import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DataSearcher } from "./pages/DataSearcher";
import { UserData } from "./pages/UserData";
import { EditData } from "./pages/EditData"

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataSearcher />}></Route>
        <Route path="/user-data" element={<UserData />}></Route>
        <Route path="/edit-data" element={<EditData />}></Route>
      </Routes>
    </BrowserRouter>
  )
}