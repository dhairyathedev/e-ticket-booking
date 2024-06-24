"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';


const EventCreationForm = () => {
  const { register, handleSubmit, control, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-purple-900 text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <span>Events</span>
          <span>Calendars</span>
          <span>Discover</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>2:53 PM GMT+5:30</span>
          <Button variant="ghost">Create Event</Button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex space-x-4">
          <Card className="w-1/3 aspect-square overflow-hidden">
            <CardContent className="p-0">
              {imagePreview ? (
                <img src={imagePreview} alt="Event preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  <span>You Are Invited</span>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="w-2/3 space-y-4">
            <Input placeholder="Event Name" {...register('eventName')} className="bg-purple-800" />
            <div className="flex space-x-2">
              <div className="w-1/2">
                <Label>Start</Label>
                <div className="flex">
                  <Input type="date" {...register('startDate')} className="bg-purple-800" />
                  <Input type="time" {...register('startTime')} className="bg-purple-800" />
                </div>
              </div>
              <div className="w-1/2">
                <Label>End</Label>
                <div className="flex">
                  <Input type="date" {...register('endDate')} className="bg-purple-800" />
                  <Input type="time" {...register('endTime')} className="bg-purple-800" />
                </div>
              </div>
            </div>
            <Input placeholder="Add Event Location" {...register('location')} className="bg-purple-800" />
            <Input placeholder="Add Description" {...register('description')} className="bg-purple-800" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Event Options</h3>
          <div className="flex items-center justify-between">
            <span>Tickets</span>
            <Controller
              name="ticketType"
              control={control}
              defaultValue="free"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Require Approval</span>
            <Controller
              name="requireApproval"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Capacity</span>
            <Controller
              name="capacity"
              control={control}
              defaultValue="unlimited"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <option value="unlimited">Unlimited</option>
                  <option value="limited">Limited</option>
                </Select>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">Create Event</Button>
      </form>
    </div>
  );
};

export default EventCreationForm;