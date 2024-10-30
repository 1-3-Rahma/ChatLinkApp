import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Notifications from "./Pages/Notifications";
import AccountSettings from "./Pages/AccountSettings";
import SignUp from "./Pages/SignUp";
import MainPage from "./Pages/MainPage";
import ChatPage from "./Pages/ChatPage";
import CreateGroup from "./Pages/CreateGroup/CreateGroup";
import AddFriends from "./Pages/AddFriends/AddFriends";
import Navbar from "./Components/Navbar/Navbar";
import GroupParticipantsListPage from "../src/Pages/GroupParticipantsListPage";
import CreateGroupSecondPage from "../src/Pages/CreateGroup/SecondPage/SecondPage";
import CreateGroupThirdPage from "../src/Pages/CreateGroup/ThirdPage/ThirdPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useSelector } from "react-redux";
function App() {
  const auth = useSelector((state) => state.user.auth);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {auth && (
            <>
              <Route
                path="/MainPage"
                element={
                  <>
                    <Navbar notificationRead={false}></Navbar>
                    <MainPage />
                  </>
                }
              />
              <Route
                path="/ChatPage"
                element={
                  <>
                    <Navbar notificationRead={true}></Navbar>
                    <ChatPage />
                  </>
                }
              />
              <Route
                path="/accountSettings"
                element={
                  <>
                    <Navbar notificationRead={true}></Navbar>
                    <AccountSettings />
                  </>
                }
              />
              <Route
                path="/notifications"
                element={
                  <>
                    <Navbar notificationRead={true}></Navbar>
                    <Notifications />
                  </>
                }
              />
              <Route
                path="/createGroup"
                element={
                  <>
                    <Navbar notificationRead={true}></Navbar>
                    <CreateGroup />
                  </>
                }
              />
              <Route
                path="/addFriends"
                element={
                  <>
                    <Navbar notificationRead={true}></Navbar>
                    <AddFriends />
                  </>
                }
              />

              <Route
                path="/groupParticipantsListPage"
                element={
                  <>
                    <Navbar NotificationRead={true}></Navbar>
                    <GroupParticipantsListPage />
                  </>
                }
              />

              <Route
                path="/createGroupSecondPage"
                element={
                  <>
                    <Navbar NotificationRead={true}></Navbar>
                    <CreateGroupSecondPage />
                  </>
                }
              />

              <Route
                path="/createGroupThirdPage"
                element={
                  <>
                    <Navbar NotificationRead={true}></Navbar>
                    <CreateGroupThirdPage />
                  </>
                }
              />
            </>
          )}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
