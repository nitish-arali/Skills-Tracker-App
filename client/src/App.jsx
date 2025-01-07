import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AddSkill from "./pages/AddUserSkills/AddUserSkills";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import ModifySkills from "./pages/ModifySkills/ModifySkills";
import SkillsOverview from "./pages/SkillsOverview/SkillsOverview";
import Masters from "./pages/Masters/Masters";
import bg from '../src/assets/bg.png';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="addNewSkills" element={<AddSkill />} />
            <Route path="modifySkills" element={<ModifySkills />} />
            <Route path="skillsOverview" element={<SkillsOverview />} />
            <Route path="masters" element={<Masters />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <AddSkill /> */}
    </>
  );
}

export default App;
