import { Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";

import { LoginSignup } from "./home-comps/LoginSignup";

import { breakpoints } from "../../utils/breakpoints";
import { api_address, post } from "../../utils/http";
import { useApi } from "../../utils/useApi";

import { useAuth0 } from "@auth0/auth0-react";

export const PageHome = () => {
  const [W, setW] = useState(window.innerWidth);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [loginSignup, setLoginSignup] = useState("login");
  const [avatar, setAvatar] = useState([0, 0]);
  //   const [avatarChange, setAvatarChange] = useState(0);
  const [theme, setTheme] = useState([0, 0]);
  const { loginWithRedirect, logout, loginWithPopup } = useAuth0();

  useEffect(() => {
    let changeW = window.addEventListener("resize", () =>
      setW(window.innerWidth)
    );
    return window.removeEventListener("resize", changeW);
  }, [W]);

  useEffect(() => {
    console.log(user);
  }, [isAuthenticated]);

  return (
    <Container
      className={`page page-home ${
        W < breakpoints.medium ? "page-home-mobile" : "page-home-desktop"
      }`}
    >
      <Container className="flex login-con">
        {user && (
          <section>
            <img src={user.picture} alt="" />
            {user.name}
          </section>
        )}
        <Container className="height100">
          <Row className="height100">
            <Col
              lg={{ span: 8, order: 1 }}
              md={{ span: 8, order: 1 }}
              xs={{ span: 12, order: 1 }}
              className="col-nopad"
            >
              <section className="height100">
                {!isAuthenticated ? (
                  <button onClick={() => loginWithRedirect()}>Login</button>
                ) : (
                  <button
                    onClick={() =>
                      logout({
                        returnTo: "http://localhost:3000",
                      })
                    }
                  >
                    Logout
                  </button>
                )}
              </section>
            </Col>
            <Col
              lg={{ span: 4, order: 2 }}
              md={{ span: 4, order: 2 }}
              xs={{ span: 12, order: 2 }}
              className={`${W < breakpoints.medium ? "flex" : ""} col-nopad`}
            >
              <Col
                lg={{ span: 12, order: 1 }}
                md={{ span: 12, order: 1 }}
                xs={{ span: 6, order: 1 }}
                className="login-con-avatar-con col-nopad"
              >
                <button
                  onClick={() => {
                    setAvatar([0, 1]);
                  }}
                >
                  avatar 1
                </button>
                <button
                  onClick={() => {
                    setAvatar([1, 1]);
                  }}
                >
                  avatar 2
                </button>
                <button
                  onClick={() => {
                    setAvatar([2, 1]);
                  }}
                >
                  avatar 3
                </button>
                <button
                  onClick={() => {
                    setAvatar([3, 1]);
                  }}
                >
                  avatar 4
                </button>
              </Col>
              <Col
                lg={{ span: 12, order: 2 }}
                md={{ span: 12, order: 2 }}
                xs={{ span: 6, order: 2 }}
                className="login-con-theme-con col-nopad"
              >
                <button onClick={() => setTheme([0, 1])}>olf theme</button>
                <button onClick={() => setTheme([1, 1])}>poke theme</button>
              </Col>
            </Col>
          </Row>
        </Container>
      </Container>

      {W < breakpoints.medium ? (
        <LoginSignup
          loginSignup={loginSignup}
          setLoginSignup={setLoginSignup}
        />
      ) : null}
    </Container>
  );
};
