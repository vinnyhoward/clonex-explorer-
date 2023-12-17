"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThinSearchIcon } from "../Icons";
import { Token } from "../../types";
import gsap from "gsap";

type SearchModalProps = {};

const SearchModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(10px);
  background-color: rgba(34, 35, 44, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  width: 500px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .search-bar {
    background: none;
    border: none;
    outline: none;
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSize.xxl};
    line-height: 40px;
    margin-left: 10px;
  }

  .search-bar::placeholder {
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSize.xxl};
    line-height: 40px;
  }
`;

export const SearchModal: React.FC<SearchModalProps> = () => {
  const el = useRef<HTMLDivElement>(null);
  const searchIconLoadingAnim = useRef<GSAPTimeline>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [lastSearchInput, setLastSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    setSearchInput(inputValue);
    setIsTyping(true);
  };

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchInput) {
        setLoading(false);
        setSearchResults([]);
        return;
      }
      setLastSearchInput(searchInput);
      setLoading(true);
      try {
        console.log("fetching....", searchInput);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    const searchLowerCase = searchInput.toLowerCase();
    const lastSearchLowerCase = lastSearchInput.toLowerCase();
    if (isTyping === false && searchLowerCase !== lastSearchLowerCase) {
      fetchSearchResults();
    }
  }, [isTyping]);

  useEffect(() => {
    if (loading) {
      searchIconLoadingAnim.current = gsap.timeline({ repeat: -1, yoyo: false });
      searchIconLoadingAnim.current.to(".thin-search-icon", {
        duration: 0.5,
        rotation: 720,
        ease: "linear",
      });

      searchIconLoadingAnim.current.to(".thin-search-icon", {
        duration: 0.25,
        y: -1.5,
        ease: "bounce.out",
      });

      searchIconLoadingAnim.current.to(".thin-search-icon", {
        duration: 0.25,
        y: 0,
        ease: "bounce.in",
      });
    } else {
      if (searchIconLoadingAnim.current) {
        searchIconLoadingAnim.current.pause();
        searchIconLoadingAnim.current.seek(0);
        searchIconLoadingAnim.current.clear();
      }
    }
  }, [loading]);

  return (
    <SearchModalContainer>
      <div ref={el} className="thin-search-icon">
        <ThinSearchIcon />
      </div>
      <input
        onChange={onInputChange}
        className="search-bar"
        type="text"
        placeholder="Search by token id..."
        value={searchInput}
      />
    </SearchModalContainer>
  );
};
