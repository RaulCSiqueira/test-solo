import React from 'react';

type MessageType = {
  message: string;
  type: 'success' | 'error';
};

const MessageText = ({ message, type }: MessageType) => {
  const getTextColorClass = () => {
    return type === 'success' ? 'text-green-500' : 'text-orange-400';
  };

  return (
    <p className={`text-xs mt-4 ${getTextColorClass()}`}>{message}</p>
  );
};

export default MessageText;
