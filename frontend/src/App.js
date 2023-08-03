import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./components/Profile/Profile";
import Messenger from "./pages/Messenger/Messenger";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Auth/AuthContextProvider";
import Settings from "./pages/Settings/Settings";

const App = () => {
  const { user } = useContext(AuthContext);
  // if (!user) {
  //   dispatch({
  //     type: "LOGIN_PROCESS",
  //     payload: JSON.parse(localStorage.getItem("user")),
  //   });
  // }
  // console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Signup />} />
        <Route exact path="/:return" element={user ? <Home /> : <Signup />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          exact
          path="/signup/:return"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          exact
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/" />}
        ></Route>
        <Route
          exact
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        ></Route>
        <Route
          exact
          path="/settings"
          element={!user ? <Navigate to="/" /> : <Settings />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
