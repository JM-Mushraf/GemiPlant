import React, { createContext, useState } from "react";
import gemini from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [resultData, setResultData] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [climate, setClimate] = useState(false);
  const [isHealthy, setHealthy] = useState(false);

  const formatResultData = (data) => {
    let formattedData = data
      .replace(/[^\w\s,.]/g, '')
      .split('.')
      .filter((sentence) => sentence.trim() !== '')
      .map((sentence, index) => `<li key=${index}>${sentence.trim()}.</li>`)
      .join('');

    return `<ul>${formattedData}</ul>`;
  };

  const onSent = async (query = input) => {
    if (!query) return;
    setLoading(true);
    setShowResult(true);
    setResultData("");
    try {
      const result = await gemini(query);
      const formatted = formatResultData(result);
      setResultData(formatted);
    } catch (error) {
      setResultData("Error fetching result, please try again.");
    }
    setLoading(false);
    setRecentPrompt(query);
    setPreviousPrompt((prev) => [query, ...prev]);
  };

  const setClimateCondition = () => setClimate(!climate);

  const setHealthyPlants = () => setHealthy(!isHealthy);

  const newChat = () => {
    setInput("");
    setShowResult(false);
  };

  const about = () => {
    alert("This app provides plant growing information, climate advice, and more!");
  };

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        resultData,
        recentPrompt,
        showResult,
        loading,
        onSent,
        setClimateCondition,
        setHealthyPlants,
        previousPrompt,
        newChat,
        about,
        climate,
        isHealthy,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
