"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { Question, Subject } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { toast } from '@/hooks/use-toast'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/alert-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateSubjectPayload, SubjectValidator } from "@/lib/validators/subject"
import { CreateQuestionPayload, QuestionValidator } from "@/lib/validators/question"
import { cn } from "@/lib/utils"

interface QuestionFormProps {
  initialData: Question | null;
  subjects: Subject[];
};

export const QuestionForm: React.FC<QuestionFormProps> = ({
  initialData,
  subjects
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit question' : 'Create question';
  const description = initialData ? 'Edit a question.' : 'Add a new question';
  const toastMessage = initialData ? 'Question updated.' : 'Question created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<CreateQuestionPayload>({
    resolver: zodResolver(QuestionValidator),
    defaultValues: initialData || {
      subjectId: '',
      description: '',
      options: ['', '', '', ''],
      correctOption: 1,
    },
    mode: "onChange",
  });

  

  const onSubmit = async (data: CreateQuestionPayload) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/question/${params.questionId}`, data);
      } else {
        await axios.post(`/api/question`, data);
      }
      router.refresh();
      router.push(`/dashboard/question`);
      toast({
        title: 'Success',
        description: toastMessage,
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

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/question/${params.questionId}`);
      router.refresh();
      router.push(`/dashboard/question`);
      toast({
        title: 'Success',
        description: 'Question Deleted',
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
      setOpen(false);
    }
  }

//   const { fields } = useFieldArray({
//     name: 'options',
//     control: form.control
//   })

  const optionsArray = ['', '', '', '']; // Your options array


  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Question Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">

          <FormField
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
</div>
          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
          control={form.control}
          name="correctOption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correct Option</FormLabel>
              <Select onValueChange={(value: string) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a correct option for question." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {/* {[1,2,3,4].map((el) => {
                      return <SelectItem value={el}>{el}</SelectItem>
                    })} */}
                  <SelectItem value='1'>1</SelectItem>
                  <SelectItem value='2'>2</SelectItem>
                  <SelectItem value='3'>3</SelectItem>
                  <SelectItem value='4'>4</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />              
            </FormItem>
          )}
        />
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
          {optionsArray.map((field, index) => (
            <div>
                

            <FormField
              control={form.control}
              key={index}
              name={`options.${index}`}
              render={({ field }) => (
                <FormItem>
                              <FormLabel>
            {`Option ${index + 1}`}
          </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} placeholder={`Enter Option ${index + 1}`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
          ))}
            </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};