import { api_address, get } from "../../utils/http";
import { Container, Col, Row } from "react-bootstrap";

import { useParams } from "react-router";

import { breakpoints } from "../../utils/breakpoints";
import { useEffect } from "react";
import { useState } from "react";

export const PageDashboard = () => {
  const [W, setW] = useState(window.innerWidth);
  const [user, setUser] = useState([]);

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
    // const arr = [];
    // res.data.forEach((obj) => {
    //   console.log(obj);
    //   console.log(obj.filter((chat) => chat.members.includes(user._id)));
    // });

    console.log(res.data.filter((chat) => !chat.members.includes(userId)));
  };

  useEffect(() => {
    let changeW = window.addEventListener("resize", () =>
      setW(window.innerWidth)
    );
    return window.removeEventListener("resize", changeW);
  }, [W]);

  useEffect(async () => {
    const abortController = new AbortController();
    fetchUser(abortController.signal);
    fetchChatrooms(abortController.signal);
    return () => abortController.abort();
  }, []);

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
            <div className="nav-con-li">
              <span>icon</span> home
            </div>
            <div className="nav-con-li">
              <span>icon</span>settings
            </div>
            <div className="nav-con-li">
              <span>icon</span>log out
            </div>
          </section>
        </Col>
        <Col
          lg={{ span: 4, order: 2 }}
          md={{ span: 4, order: 2 }}
          xs={{ span: 12, order: 2 }}
          className="dashboard-con-col2"
        >
          {userChatrooms.map((room) => {
            return (
              <section className="col2-chatroom-con">
                <div className="flex chatroom-con-title-fav-con">
                  <h5>{room.name}</h5>
                  <div className="title-fav-con-fav">O</div>
                </div>
                <div className="chatroom-con-mes">latest message</div>
              </section>
            );
          })}

          <form action={api_address + "/create-chatroom"} method="post">
            <input type="text" name="name" id="" placeholder="chatroom name" />
            <input type="text" name="creater" id="" value={user._id} hidden />

            <button type="submit">create</button>
          </form>
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
