import React, { useContext } from "react";
import "./Main.css";
import { FaSeedling } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { Context } from "../../context/context.jsx";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  async function handleCardClick(event) {
    if (!event.target.closest(".card")) return;

    const clickedCard = event.target.closest(".card");
    let clickedCardText = clickedCard.querySelector("h1").textContent;
    clickedCardText = "How to grow " + clickedCardText + " plants";
    await onSent(clickedCardText);
  }

  return (
    <>
      <div className="bg"></div>
      <div className="main">
        <div className="main-bottom">
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
        </div>

        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p><span>Welcome!</span></p>
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
