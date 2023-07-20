import React from "react";
import io from "socket.io-client";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";

import Messages from "../Messages/Messages";

import s from "./Chat.module.css";

const socket = io.connect("http://localhost:3000");

function Chat() {
 const { search } = useLocation();
 const [params, setParams] = useState({ room: "", name: "" });
 const [state, setState] = useState([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
 const [isOpenEmoji, setisOpenEmoji] = useState(false);

 useEffect(() => {
  const searchParams = Object.fromEntries(new URLSearchParams(search));
  setParams(searchParams);
  socket.emit("join", searchParams);
 }, [search]);

 useEffect(() => {
  socket.on("message", ({ data }) => {
   setState((state) => [...state, data]);
  });
 }, []);

  const handleSubmit = (e) => {
   setText(text);
   socket.emit("message", { text });
   setText("");
  };

  const handleChange = ({ target: { value } }) => {
   setText(value);
  };

  const onEmojiClick = ({ emoji }) => {
   setMessage(`${message}  ${emoji}`);
  };

 return (
  <section>
   <Messages params={params.name} messages={state} />
   <form className={s.chat__form}>
    <Link to="/">Back</Link>
    <input
       type="text"
       name="message"
       placeholder="Message"
       autoComplete="off"
       className={s.chat__input}
       onChange={handleChange}
       value={text}
      />
    <div className={s.emoji}>
     <button
      className={s.emoji__button}
      onClick={() => setisOpenEmoji(!isOpenEmoji)}
      value="😀"
     >
      😀
     </button>
    </div>
    {isOpenEmoji && (
       <div className={s.emoji__container}>
        <EmojiPicker onEmojiClick={onEmojiClick} />
       </div>
      )}
    <button type="submit" className={s.chat__button} onClick={handleSubmit}>
       Send a message
      </button>
   </form>
  </section>
 );
}

export default Chat;
