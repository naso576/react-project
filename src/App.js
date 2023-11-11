import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar1 from "./scenes/global/Sidebar";
import Contacts from "./scenes/contacts";
import SignInSide from "./scenes/sign-in";
import SignUp from "./scenes/signup";
import PatientProfile from "./scenes/profiles";
import ManageProfile from "./scenes/manageprofiles";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar1 isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/contacts" element={<Contacts/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/sign-in" element={<SignInSide/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/profiles" element={<PatientProfile/>}/>
              <Route path="/manageprofiles" element={<ManageProfile/>}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;