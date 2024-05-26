"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { MdDelete } from "react-icons/md";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCopy } from "react-icons/io5";

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const { toast } = useToast();

  const { data: session } = useSession();
  const user = session?.user;

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });
  // not handling delete route ------------------------------------------------------------

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        // console.log(response);
        setMessages(response.data.messages ? response.data.messages : []);
        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing latest messages",
            variant: "default",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ?? "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

  // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessages();
  }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);

  // Handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to update message settings",
        variant: "destructive",
      });
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied!",
      description: "Profile URL has been copied to clipboard.",
    });
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-center dark:text-white">
        User Dashboard
      </h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2 dark:text-white">
          Copy Your Unique Link
        </h2>{" "}
        <div className="flex items-center">
          <input
            className={`w-full p-4 text-base border-2 rounded-lg transition-all duration-300 
           ${focused ? "border-gray-500 shadow-lg" : "border-gray-300"} `}
            type="text"
            value={profileUrl}
            disabled
            // className="input input-bordered w-full p-2 mr-2"
          />
          <button
            className="px-3 text-2xl text-gray-400 hover:text-gray-600 transition-colors dark:text-white duration-300"
            onClick={copyToClipboard}
          >
            <IoCopy />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2 dark:text-white">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="text-center mb-4 mt-2 bg-gray-100 dark:bg-gray-900 py-8">
        <h1 className="text-3xl font-bold text-black dark:text-gray-200">
          Hey {user?.username} you have got some messages
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-2xl  hover:scale-105 hover:border-gray-400 text-gray-800 rounded-xl hover:rounded-3xl animate hover:animate-wiggle"
            >
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Anonymous Message {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <p className=" break-words dark:text-white ">
                  {message.content}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>
            <h1>No messages found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
