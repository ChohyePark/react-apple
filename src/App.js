import React, { useEffect, useState } from "react";
import reset from "./App.css";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

const Container = styled.div`
  width: 600px;
  margin: auto;
  height: 1600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  box-sizing: border-box;
  padding: 0 2%;

  ul {
    li {
      color: #ffff;
      font-size: 42px;
      font-weight: 700;
    }
  }
`;

const ScrollOpacityList = () => {
  const [opacityList, setOpacityList] = useState([0.15, 0.15, 0.15]);
  const listItems = [
    "KR2me.com is a smart forwarding service provider in Korea.",
    " Our Service include mail and parcel receiving, forwarding, package optimize, ",
    " online payment service with the lowest price in Korea.",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacityList = [...opacityList];

      listItems.forEach((_, index) => {
        if (scrollY >= 100 + index * 200 && scrollY <= 300 + index * 200) {
          newOpacityList[index] =
            0.15 + ((scrollY - (100 + index * 200)) / 250) * (1 - 0.15);
        } else if (scrollY > 300 + index * 200) {
          newOpacityList[index] = 0.15;
        } else {
          newOpacityList[index] = 0.15;
        }
      });

      setOpacityList(newOpacityList);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [opacityList]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <ul id="my-list">
          {listItems.map((item, index) => (
            <li key={index} style={{ opacity: opacityList[index] }}>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default ScrollOpacityList;
