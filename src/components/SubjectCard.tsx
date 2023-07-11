"use client"
import React from 'react';
import { Button } from './ui/button';

interface SubjectCardProps {
    subject: {
      id: string;
      name: string;
    };
    onSubscribe: (subject: { id: string; name: string }) => void;
    isSubscribed: boolean;
    loading: boolean
  }

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onSubscribe, isSubscribed, loading }) => {
  const handleSubscribe = () => {
    onSubscribe(subject);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium">{subject.name}</h3>
      {isSubscribed ? (
        <Button disabled={loading} className="ml-auto" type="submit">
        Continue
      </Button>
      ) : (
        <Button onClick={handleSubscribe} disabled={loading} className="ml-auto" type="submit">
            Start
        </Button>
      )}
    </div>
  );
};

export default SubjectCard;
