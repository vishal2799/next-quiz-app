"use client"
import React, { useState } from 'react';
import SubjectList from '../components/SubjectList';
import axios from 'axios';
import { useParams, useRouter } from "next/navigation"
import { toast } from '@/hooks/use-toast'
import { SubscribeToSubjectPayload } from '@/lib/validators/subject';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SubscribeToSubjectPayload) => {
    try {
      setLoading(true);
      const sub = await axios.post(`/api/subscription`, data);
      console.log(sub, 'subscription');
      router.refresh();
      router.push(`/game/${sub.data.subjectId}`);
      toast({
        title: 'Success',
        description: 'Subject Subscribed',
        variant: 'default',
      })
    } catch (error: any) {
        toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'destructive',
          })
    } finally {
      setLoading(false);
    }
  };

  // Latest subjects (example data)
  const latestSubjects = [
    { id: 'cljuirbmz0000v8gss9wenw13', name: 'UI/UX' },
    { id: 'cljuc1r8h0001v8nc2psv1bbe', name: 'Economics' },
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

  const handleSubscribe = (subject: { name: any; id: any; }) => {
    // Implement the subscription logic here
    onSubmit({subjectId: subject.id});
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Choose a Subject</h1>
      <SubjectList
        latestSubjects={latestSubjects}
        subscribedSubjects={subscribedSubjects}
        onSubscribe={handleSubscribe}
        loading={loading}
      />
    </div>
  );
};

export default HomePage;
