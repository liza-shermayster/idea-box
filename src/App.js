/* src/App.js */
import React from "react";
import { Category } from "./Category";
import "./App.css";

const App = () => {
  return (
    <div className="App min-h-screen min-w-full">
      <header className="mb-10 shadow-xl bg-opacity-50 bg-purple-800">
        <nav class="flex items-center justify-between flex-wrap text-white p-6">
          header
        </nav>
      </header>
      <div className="flex justify-center">
        <div className="">
          <Category />
        </div>
      </div>
    </div>
  );
};

export default App;
