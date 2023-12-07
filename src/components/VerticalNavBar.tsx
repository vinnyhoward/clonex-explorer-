"use client";
import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import Image from "next/image";
import CloneXLogo from "../assets/images/clone-x-logo.png";
import { defaultTheme } from "../styles/defaultTheme";
import { OpenSeaIcon, DiscordIcon, TwitterIcon } from "./Icons";

const NavBarContainer = styled.div`
  .container {
    position: fixed;
    left: -100px;
    top: 0;
    height: 100vh;
    width: 100px;
    background-color: ${(props) => props.theme.gradient.darkBlueGradient};
    z-index: 1;
    padding: 50px 0;
  }

  .navbar-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: auto 0;
    overflow-x: hidden;
  }
  
  .logo-wrapper {
    display: flex;
    align-items: center;
    transform: rotate(-90deg);
    transform-origin: center;
    height: 150px;
  }

  .social-container {}

  .icon-wrapper {
    margin: 20px 0;
  }
`;

const VerticalNavBar = () => {
  const el = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(".container", {
        keyframes: [{ x: 100, duration: 0.25, ease: "sine.out" }],
        ease: "expo.inOut",
      });
    }, el);
  }, []);

  const iconSize = 25;
  return (
    <NavBarContainer ref={el}>
      <div className="container">
        <div className="navbar-content">
          <div className="social-container">
            <div className="icon-wrapper">
              <OpenSeaIcon
                color={defaultTheme.colors.white}
                width={iconSize}
                height={iconSize}
              />
            </div>
            <div className="icon-wrapper">
              <DiscordIcon
                color={defaultTheme.colors.white}
                width={iconSize}
                height={iconSize}
              />
            </div>
            <div className="icon-wrapper">
              <TwitterIcon
                color={defaultTheme.colors.white}
                width={iconSize}
                height={iconSize}
              />
            </div>
          </div>
          <div className="logo-wrapper">
            <Image
              className="clone-logo letter-c"
              alt="Clone X Logo"
              src={CloneXLogo}
              width={120}
              height={120}
            />
          </div>
        </div>
      </div>
    </NavBarContainer>
  );
};

export default VerticalNavBar;
