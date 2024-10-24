import React, { useState } from "react";
import "./Home.css";
import { FaSeedling } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Sidebar from "../sidebar/Sidebar.jsx"; 
import gemini from "../../config/gemini";
import GemiText from "../text/text.jsx"

const Main = () => {
  const [input, setInput] = useState("");
  const [resultData, setResultData] = useState(""); 
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [promptResults, setPromptResults] = useState({}); 
  
  const formatResultData = (data) => {
    let formattedData = data
      .replace(/[^\w\s,.]/g, '') 
      .split('.')                
      .filter(sentence => sentence.trim() !== '')
      .map((sentence, index) => `<li key=${index}>${sentence.trim()}.</li>`)
      .join('');
    return `<ul>${formattedData}</ul>`;
  };

  const onSent = async (query = input) => {
    if (!query) return;
    setRecentPrompt(query);
    setLoading(true);
    setShowResult(true);
    setResultData("");
    
    try {
      const result = await gemini(query);
      const formatted = formatResultData(result);
      setResultData(formatted);
      setPromptResults(prev => ({ ...prev, [query]: formatted }));
    } catch (error) {
      setResultData("Error fetching result, please try again.");
    }
    
    setLoading(false);
    setPreviousPrompts(prev => [query, ...prev]);
  };

  const loadPrompt = (prompt) => {
    const previousResult = promptResults[prompt];
    if (previousResult) {
      setResultData(previousResult);
      setShowResult(true);
      setRecentPrompt(prompt); 
    }
  };

  const deletePrompt = (promptToDelete) => {
    setPreviousPrompts((prev) => prev.filter(prompt => prompt !== promptToDelete));
    setPromptResults((prev) => {
      const { [promptToDelete]: _, ...rest } = prev;
      return rest;
    });
  };

  const newChat = () => {
    if (input.trim()) {
      setPreviousPrompts(prev => [input, ...prev]);
    }
    setInput("");
    setShowResult(false);
  };

  async function handleCardClick(event) {
    if (!event.target.closest(".card")) return;

    const clickedCard = event.target.closest(".card");
    let clickedCardText = clickedCard.querySelector("h1").textContent;
    clickedCardText = "How to grow " + clickedCardText + " plants";
    await onSent(clickedCardText);
  }

  return (
    <>
      <Sidebar 
        onSent={loadPrompt}
        previousPrompt={previousPrompts} 
        setRecentPrompt={setRecentPrompt} 
        newChat={newChat} 
        deletePrompt={deletePrompt}
        className="sidebar"
      />
      <div className="bg"> </div>
      <div className="main">
        <div className="text"><GemiText/></div>
        <div className="search-box">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search or ask about plants..."
            value={input}
          />
          <div>
            <IoSend onClick={() => onSent()} className="input-icons" size={30} />
          </div>
        </div>

        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p><span>Vanakam!</span></p>
                <p>Discover the best plants for your environment!</p>
              </div>
              <div className="cards">
                <div className="card" onClick={handleCardClick} id="tropical">
                  <h1>Tropical</h1>
                </div>
                <div className="card" id="temperate" onClick={handleCardClick}>
                  <h1>Temperate</h1>
                </div>
                <div className="card" id="arid" onClick={handleCardClick}>
                  <h1>Arid</h1>
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <FaSeedling size={20} />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
