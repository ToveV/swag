import { api_address, get } from "../../utils/http";
import { Container, Col, Row } from "react-bootstrap";

import { useParams } from "react-router";

import { breakpoints } from "../../utils/breakpoints";
import { parse } from "../../utils/parse";
import { useEffect } from "react";
import { useState } from "react";

import { WS } from "../../js/ws";
import { ChatroomsHome } from "./dashboard-comps/home/ChatroomsHome";
import { ChatHome } from "./dashboard-comps/home/ChatHome";
import { ChatroomsSettings } from "./dashboard-comps/settings/ChatroomsSettings";
import { UserSettings } from "./dashboard-comps/settings/UserSettings";
import { Nav } from "./dashboard-comps/Nav";
import { UserAvatar } from "./dashboard-comps/UserAvatar";

export const PageDashboard = () => {
  const [W, setW] = useState(window.innerWidth);
  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(true);

  const [dashboardNavState, setDashboardNavState] = useState("home");

  // chatrooms states
  const [activeChatroom, setActiveChatroom] = useState({});
  const [allChatrooms, setAllChatrooms] = useState([]);
  const [userChatrooms, setUserChatrooms] = useState([]);
  const [joinableChatrooms, setJoinableChatrooms] = useState([]);
  const [searchChatrooms, setSearchChatrooms] = useState("");

  let userId = useParams().id;

  const fetchUser = async (signal) => {
    let res = await get(`/get-user/${userId}`, signal);
    console.log(res.data);
    setUser(res.data);
  };

  const fetchChatrooms = async (signal) => {
    let res = await get(`/get-all-chatrooms`, signal);
    console.log(res.data);

    setAllChatrooms(res.data);
    setUserChatrooms(res.data.filter((chat) => chat.members.includes(userId)));

    setJoinableChatrooms(
      res.data.filter((chat) => !chat.members.includes(userId))
    );
    // setActiveChatroom(
    //   res.data.filter((chat) => chat.members.includes(userId))[0]
    // );

    fetchUser();
    setLoading(false);
  };

  useEffect(() => {
    let changeW = window.addEventListener("resize", () =>
      setW(window.innerWidth)
    );
    return window.removeEventListener("resize", changeW);
  }, [W]);

  useEffect(async () => {
    const abortController = new AbortController();
    await fetchChatrooms(abortController.signal);
    return () => abortController.abort();
  }, []);

  if (loading) {
    return <h2 className="">Loading...</h2>;
  }

  return (
    <Container
      className={`page page-dashboard ${
        W < breakpoints.medium
          ? "page-dashboard-mobile"
          : "page-dashboard-desktop"
      }`}
    >
      <Row className="dashboard-con">
        <Col
          lg={{ span: 2, order: 1 }}
          md={{ span: 2, order: 1 }}
          xs={{ span: 12, order: 1 }}
          className="flex dashboard-con-col1"
        >
          <UserAvatar user={user} />

          <Nav setDashboardNavState={setDashboardNavState} />
        </Col>
        <Col
          lg={{ span: 4, order: 2 }}
          md={{ span: 4, order: 2 }}
          xs={{ span: 12, order: 2 }}
          className="dashboard-con-col2"
        >
          <h4>Chatrooms</h4>

          <input
            type="text"
            name=""
            id=""
            placeholder="search chatrooms"
            onInput={(e) => setSearchChatrooms(e.target.value)}
          />

          {dashboardNavState === "home" ? (
            <ChatroomsHome
              user={user}
              userChatrooms={userChatrooms}
              searchChatrooms={searchChatrooms}
              setActiveChatroom={setActiveChatroom}
            />
          ) : (
            <ChatroomsSettings
              userChatrooms={userChatrooms}
              searchChatrooms={searchChatrooms}
            />
          )}
        </Col>
        {W > breakpoints.medium ? (
          <Col
            lg={{ span: 6, order: 3 }}
            md={{ span: 6, order: 3 }}
            xs={{ span: 12, order: 3 }}
            className="dashboard-con-col3"
          >
            {dashboardNavState === "home" ? (
              <ChatHome user={user} activeChatroom={activeChatroom} />
            ) : (
              <UserSettings />
            )}
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};
