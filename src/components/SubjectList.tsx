"use client"
import React from 'react';
import SubjectCard from './SubjectCard';

interface SubjectListProps {
    latestSubjects: {
      id: string;
      name: string;
    };
    subscribedSubjects: {
        id: string;
      name: string;
    };
    onSubscribe: (subject: { id: string; name: string }) => void;
    
  }

const SubjectList = ({ latestSubjects, subscribedSubjects, onSubscribe }:any) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Latest Subjects</h2>
      <div className="flex overflow-x-scroll mb-4">
        {latestSubjects.map((subject: any) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onSubscribe={onSubscribe}
            isSubscribed={subscribedSubjects.some((subscribedSubject:any) => subscribedSubject.id === subject.id)}
          />
        ))}
      </div>

      <h2 className="text-lg font-bold mb-4">Subscribed Subjects</h2>
      <div className="flex overflow-x-scroll">
        {subscribedSubjects.map((subject:any) => (
          <SubjectCard key={subject.id} subject={subject} isSubscribed={true} onSubscribe={onSubscribe} />
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
