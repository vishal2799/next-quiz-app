"use client"
import React from 'react';

interface SubjectCardProps {
    subject: {
      id: string;
      name: string;
    };
    onSubscribe: (subject: { id: string; name: string }) => void;
    isSubscribed: boolean;
  }

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onSubscribe, isSubscribed }) => {
  const handleSubscribe = () => {
    onSubscribe(subject);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium">{subject.name}</h3>
      {isSubscribed ? (
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md">
          Continue
        </button>
      ) : (
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      )}
    </div>
  );
};

export default SubjectCard;
