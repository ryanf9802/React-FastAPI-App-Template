import React from "react";
import "./Home.css";

import axiosClient from "@util/axiosClient";

import { VerticalDivideTwoSection } from "@/modules/layouts";
import { ModalA } from "@/modules/modals";

import AddUserForm from "./AddUserForm/AddUserForm";

const Home = () => {
  const [showAddUserModal, setShowAddUserModal] = React.useState(false);

  const [users, setUsers] = React.useState([]);

  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [userListError, setUserListError] = React.useState(null);
  const refreshUsers = async () => {
    try {
      setLoadingUsers(true);
      let { data } = await axiosClient.get("/example_users/user_list");
      setUsers(data);
    } catch (err) {
      setUserListError(err.response?.data?.detail || err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  React.useEffect(() => {
    refreshUsers();
  }, []);
  return (
    <div id="home">
      <VerticalDivideTwoSection
        sectionChildren1={
          <div id="home-left-container">
            <HomeHeader />
            <HomeSubText />
          </div>
        }
        sectionChildren2={
          <div id="home-right-container">
            <UserList
              users={users}
              loadingUsers={loadingUsers}
              userListError={userListError}
            />
            <button
              disabled={showAddUserModal}
              onClick={() => setShowAddUserModal(true)}
            >
              Add User
            </button>
          </div>
        }
      />
      {showAddUserModal && (
        <ModalA closeModal={() => setShowAddUserModal(false)}>
          <AddUserForm refreshUsers={refreshUsers} />
        </ModalA>
      )}
    </div>
  );
};

export default Home;

const HomeHeader = () => {
  return <h1>App Template Home</h1>;
};

const HomeSubText = () => {
  return (
    <div id="home-subtext-container">
      <p>This is an example user list being retrieved from the API.</p>
      <ol>
        <li>
          The UserList component makes a request to the API using the
          axiosInstance object (ui/src/util/axiosClient.js)
        </li>
        <li>
          The UI origin URL is approved by the CORSMiddleware
          (api/src/middleware)
        </li>
        <li>
          The /example_users/user_list endpoint is reached
          (api/routers/example_user_router.py)
        </li>
      </ol>
      <p>
        Note that adding a user will not actually do anything as there is no
        database set up... the button is there to showcase the modal and form.
      </p>
      <p>
        More detail can be found at the API docs:{" "}
        <a href="http://localhost:8000/docs" target="_blank">
          localhost:8000/docs
        </a>
      </p>
    </div>
  );
};

const UserList = ({ users, loadingUsers, userListError }) => {
  return loadingUsers ? (
    <span>Loading...</span>
  ) : userListError ? (
    <span>Error: {userListError}</span>
  ) : (
    <ul className="user-list">
      {users.map(({ id, username, email }) => (
        <li key={id}>
          <strong>{username}</strong> - {email}
        </li>
      ))}
    </ul>
  );
};
