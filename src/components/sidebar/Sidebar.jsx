import React, { useState } from "react";
import "./Sidebar.css";
import { BiMenuAltRight } from "react-icons/bi"; 
import { AiOutlineMessage } from "react-icons/ai"; 
import { FaRegMessage } from "react-icons/fa6"; 
import { FaLeaf } from "react-icons/fa"; 
import { FaTrash } from "react-icons/fa";

const Sidebar = ({ onSent, previousPrompt, setRecentPrompt, newChat, deletePrompt }) => {
  const [extend, setExtend] = useState(false);

  const loadPrompt = (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt);
  };

  const about = () => {
    alert("This app provides plant growing information, climate advice, and more!");
  };

  return (
    <div className={`sidebar ${extend ? "extended" : ""}`}>
      <div className="top">
        <BiMenuAltRight className="sidebar-icons" size={40} onClick={() => setExtend((prev) => !prev)} />
        <div onClick={newChat} className="new-chat">
          <AiOutlineMessage className="sidebar-icons" size={30} />
          {extend && <p>New Chat</p>}
        </div>
      </div>

      {extend && (
        <div className="recent">
          <p className="recent-title">Recents</p>
          {previousPrompt.map((item, index) => (
            <div key={index} className="recent-entry">
              <FaRegMessage size={30} onClick={() => loadPrompt(item)} />
              <p>{`${item.slice(0, 18)}`}</p>
              <FaTrash onClick={() => deletePrompt(item)} className="delete-icon" size={20} />
            </div>
          ))}
        </div>
      )}

      <div className="bottom">
        <div className="bottom-item recent-entry" onClick={about}>
          <FaLeaf className="sidebar-icons" size={30} />
          {extend && <p>Help</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
