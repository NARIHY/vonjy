import React from 'react';

interface MessageProps {
  message: {
    id: number;
    subject: string;
    content: string;
    user_id: string;
  };
}

const ShowMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{message.subject}</h1>
      <p className="mb-4 text-gray-700">{message.content}</p>
      <p className="text-sm text-gray-500">Envoyé par : {message.user_id}</p>
    </div>
  );
};

export default ShowMessage;
