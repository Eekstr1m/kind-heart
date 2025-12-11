import { BrowserRouter, Route, Routes } from "react-router";
import ProjectsPage from "./ProjectsPage";
import ArchivePage from "./ArchivePage";
import HomePage from "./HomePage";
import ContactsPage from "./ContactsPage";
import EmergencyPage from "./EmergencyPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/projects"} element={<ProjectsPage />} />
        <Route path={"/archive"} element={<ArchivePage />} />
        <Route path={"/contacts"} element={<ContactsPage />} />
        <Route path={"/emergency"} element={<EmergencyPage />} />
      </Routes>
    </BrowserRouter>
  );
};
