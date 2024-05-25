import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";
import Main from "./components/Main";

export default function App() {
  return (
    <>
      <header>
        <h1>ポケモン図鑑</h1>
      </header>
      <Main></Main>
    </>
  );
}
