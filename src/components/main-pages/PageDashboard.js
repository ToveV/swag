import { api_address, get } from "../../utils/http";
import { Container, Col, Row } from "react-bootstrap";

import { useParams } from "react-router";

import { breakpoints } from "../../utils/breakpoints";
import { parse } from "../../utils/parse";
import { useEffect } from "react";
import { useState } from "react";

import { WS } from "../../js/ws";
import { ChatroomsHome } from "./dashboard-comps/home/ChatroomsHome";
import { ChatroomsSettings } from "./dashboard-comps/settings/ChatroomsSettings";

export const PageDashboard = () => {
  // use WebSocket
  // const websocket = new WebSocket("ws://localhost:5002");
  // console.log("ws");

  // websocket.addEventListener("close", (event) => {
  //   console.log("Server down...", event);
  // });
  // websocket.addEventListener("message", ({ data }) => {
  //   console.log("Message from server: ", data);

  //   let obj = parse(data);

  //   console.log(obj);
  // });

  const [W, setW] = useState(window.innerWidth);
  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(true);

  const [dashboardNavState, setDashboardNavState] = useState("home");

  // chatrooms states
  const [activeChatroom, setActiveChatroom] = useState({});
  const [allChatrooms, setAllChatrooms] = useState([]);
  const [userChatrooms, setUserChatrooms] = useState([]);
  const [joinableChatrooms, setJoinableChatrooms] = useState([]);

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
    setActiveChatroom(
      res.data.filter((chat) => chat.members.includes(userId))[0]
    );
    console.log(activeChatroom, "active chat");

    fetchUser();

    console.log(res.data.filter((chat) => !chat.members.includes(userId)));

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
      {/* <section>
        <h1>Dashboard Page</h1>
        <a href={api_address + "/user-logout"}>logout</a>
        <h2>{user.name}</h2>
        <h2>{user.avatar}</h2>
      </section> */}
      <Row className="dashboard-con">
        <Col
          lg={{ span: 2, order: 1 }}
          md={{ span: 2, order: 1 }}
          xs={{ span: 12, order: 1 }}
          className="flex dashboard-con-col1"
        >
          <section className="flex col1-user-con">
            <div className="height100 user-con-avatar">
              avatar: {user.avatar}
            </div>
            <div>{user.name}</div>
          </section>

          <section className="flex col1-nav-con">
            <div
              className="nav-con-li"
              onClick={() => {
                setDashboardNavState("home");
              }}
            >
              <span>icon</span> home
            </div>
            <div
              className="nav-con-li"
              onClick={() => {
                setDashboardNavState("settings");
              }}
            >
              <span>icon</span>settings
            </div>
            <a href={api_address + "/user-logout"} className="nav-con-li">
              <span>icon</span>log out
            </a>
          </section>
        </Col>
        <Col
          lg={{ span: 4, order: 2 }}
          md={{ span: 4, order: 2 }}
          xs={{ span: 12, order: 2 }}
          className="dashboard-con-col2"
        >
          <h4>Chatrooms</h4>

          <input type="text" name="" id="" placeholder="search chatrooms" />

          {dashboardNavState === "home" ? (
            <ChatroomsHome user={user} userChatrooms={userChatrooms} />
          ) : (
            <ChatroomsSettings userChatrooms={userChatrooms} />
          )}
        </Col>
        {W > breakpoints.medium ? (
          <Col
            lg={{ span: 6, order: 3 }}
            md={{ span: 6, order: 3 }}
            xs={{ span: 12, order: 3 }}
            className="dashboard-con-col3"
          >
            <section className="flex height100 col3-chat-con">
              <section className="flex chat-con-top">
                <div className="flex top-userinfo">
                  <div className="userinfo-avatar">ava</div>
                  <div className="userinfo-name">{user.name}</div>
                  <div>{activeChatroom.name}</div>
                </div>
                <div className="flex top-settings">
                  <div className="userinfo-avatar">...</div>
                </div>
              </section>
              <section className="height100 chat-con-mid">
                {activeChatroom.messages.map((m) => {
                  return <div>ett message</div>;
                })}
              </section>
              <section className="chat-con-bot">
                <form action={api_address + "/create-message"} method="post">
                  <input
                    type="text"
                    name="text"
                    id=""
                    placeholder="write message"
                  />
                  <input
                    type="text"
                    name="chatroom"
                    value={activeChatroom._id}
                    hidden
                  />
                  <input type="text" name="sender" value={user._id} hidden />
                  {/* <input type="text" name="time" value="13.37" hidden /> */}
                  <button type="submit">send</button>
                </form>
              </section>
            </section>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};
