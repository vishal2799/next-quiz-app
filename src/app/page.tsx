"use client"
import React from 'react';
import SubjectList from '../components/SubjectList';

const HomePage = () => {
  // Latest subjects (example data)
  const latestSubjects = [
    { id: '1', name: 'Math' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'History' },
    { id: '4', name: 'English' },
    // Add more latest subjects as needed
  ];

  // Subscribed subjects (example data)
  const subscribedSubjects = [
    { id: '4', name: 'English' },
    { id: '5', name: 'Geography' },
    // Add more subscribed subjects as needed
  ];

  const handleSubscribe = (subject: { name: any; }) => {
    // Implement the subscription logic here
    console.log(`Subscribed to ${subject.name}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Choose a Subject</h1>
      <SubjectList
        latestSubjects={latestSubjects}
        subscribedSubjects={subscribedSubjects}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default HomePage;
