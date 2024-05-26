"use client";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "@/components/ui/use-toast";

export default function Component() {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const user = session?.user;

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username: user?.username,
        content: message,
      });
      toast({
        title: "Send Successfully",
        description: "Your message will be displayed to the admin",
      });
      setMessage(""); // Clear the message field after successful submission
      // console.log(response)
    } catch (error) {
      toast({
        title: "Try again later",
        description: "Cannot send messages.",
      });
    }
  };

  return (
    <main>
      <main
        key="1"
        className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950"
      >
        <div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">About TrueTalk</h2>
              <p className="text-gray-500 dark:text-gray-400">
                TrueTalk is a platform that enables anonymous, honest
                conversations. We believe in the power of open and transparent
                communication to build trust and foster personal growth.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Send an Anonymous Message</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Have something you want to share? Send an anonymous message to
                me.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4 w-full">
                    Send Anonymous Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Send an Anonymous Message</DialogTitle>
                    <DialogDescription>
                      Your message will be delivered anonymously to the TrueTalk
                      team.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter your message..."
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>
                      Send Message
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
