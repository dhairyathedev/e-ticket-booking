"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  eventName: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string(),
  location: z.string(),
  image: z.string().optional(),
});

export default function CreateForm() {
  const {toast} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
      location: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-full max-w-4xl mt-20">
      <div className="flex sm:flex-row flex-col sm:items-start sm:justify-start items-center justify-center sm:gap-x-10">
        <div className="sm:w-1/3 w-full mx-auto flex items-center justify-center">
          <Image
            src="/img/demo.avif"
            width={300}
            height={300}
            alt="IMAGE"
            className="rounded-md w-96"
          />
        </div>
        <div className="sm:w-2/3 w-ful sm:mt-0 mt-8 mx-3 mb-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col"
            >
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Event Name"
                        className="w-full border-none shadow-none focus-visible:ring-0 text-3xl font-semibold opacity-85 hover:opacity-100 transition-opacity text-emerald-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row space-x-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col ml-2 w-full">
                    <FormLabel>Event Start</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <= new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col ml-2 w-full">
                    <FormLabel>Event End</FormLabel>
                    <Popover >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <= new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your event"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-emerald-600 text-white hover:bg-emerald-700 w-full"
              >
                Create Event
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
