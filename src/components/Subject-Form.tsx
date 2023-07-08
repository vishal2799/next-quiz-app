"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { Subject } from "@prisma/client"
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

interface SubjectFormProps {
  initialData: Subject | null;
};

export const SubjectForm: React.FC<SubjectFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit subject' : 'Create subject';
  const description = initialData ? 'Edit a subject.' : 'Add a new subject';
  const toastMessage = initialData ? 'Subject updated.' : 'Subject created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<CreateSubjectPayload>({
    resolver: zodResolver(SubjectValidator),
    defaultValues: initialData || {
      name: '',
    }
  });

  

  const onSubmit = async (data: CreateSubjectPayload) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/subject/${params.subjectId}`, data);
      } else {
        await axios.post(`/api/subject`, data);
      }
      router.refresh();
      router.push(`/dashboard/subject`);
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
      await axios.delete(`/api/subject/${params.subjectId}`);
      router.refresh();
      router.push(`/dashboard/subject`);
      toast({
        title: 'Success',
        description: 'Subject Deleted',
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Subject name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};