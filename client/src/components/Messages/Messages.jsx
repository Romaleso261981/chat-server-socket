import React from "react";

// import {trimString} from '../../../utils/trimString'

import s from "./Messages.module.css";

function Messages({ messages, name }) {
 console.log(messages);
 console.log(name);
 return (
  <div className={s.messageContainer}>
   <h1 className={s.message_header}>header</h1>
   {messages &&
    messages.map(({ user, message }, index) => {
     console.log(user);
     console.log(message);
     return (
		 <section
			 key={index}
			 className={s.messageBox}
		 >
			 <h1>{user.name}</h1>
       <h1 className={s.sentText}>{message}</h1>
      </section>
     );
    })}
  </div>
 );
}

export default Messages;
