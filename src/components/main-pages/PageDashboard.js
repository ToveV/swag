import { api_address, get } from "../../utils/http";
import { Container, Col, Row } from "react-bootstrap";

import { useParams } from "react-router";

import { breakpoints } from "../../utils/breakpoints";
import { useEffect } from "react";
import { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

export const PageDashboard = () => {
  const [W, setW] = useState(window.innerWidth);
  const [User, setUser] = useState([]);
  let userId = useParams().id;
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  // user = User;
  // console.log(user);

  const fetchUser = async (signal) => {
    let res = await get(`/get-user/${userId}`, signal);
    console.log(res.data);
    setUser(res.data);
  };

  useEffect(() => {
    let changeW = window.addEventListener("resize", () =>
      setW(window.innerWidth)
    );
    return window.removeEventListener("resize", changeW);
  }, [W]);

  useEffect(() => {
    fetchUser();
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
          <section className="col1-user-con">user con</section>
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
          MID
        </Col>
        {W > breakpoints.medium ? (
          <Col
            lg={{ span: 6, order: 3 }}
            md={{ span: 6, order: 3 }}
            xs={{ span: 12, order: 3 }}
            className=""
          >
            RIGHT
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};
