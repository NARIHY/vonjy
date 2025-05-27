import { useEffect, useState } from 'react';
import echo from '../../echo';

type Message = {
  content: string;
  subject: string;
};

function MessageListener() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const channel = echo.channel('messages')
      .listen('.new-message', (e: { message: Message }) => {
        setMessages((prev) => [...prev, e.message]);
      });

    return () => {
      channel.stopListening('.new-message');
    };
  }, []);

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>
          <h1> {msg.subject} </h1>
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageListener;
