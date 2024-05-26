import { Card, CardContent } from "@/components/ui/card";
import { ContactIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { BiSolidConversation } from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";

const page = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Speak Your Mind Anonymously
                  </h1>
                  <p className="max-w-[700px] py-4 text-gray-500 md:text-xl dark:text-gray-400">
                    TrueTalk is a platform that empowers you to share your
                    honest feedback and opinions without fear of judgment or
                    repercussions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="/sign-up"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
              <div>
                <Card className="w-full max-w-2xl bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
                  <CardContent className="shadow-lg hover:shadow-2xl">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                        TrueTalk
                      </h2>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <VscFeedback />
                        <span>Anonymous Feedback</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <CiShare1 />
                        <span>Confidential Opinion Sharing</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <BiSolidConversation />
                        <span>Conversations made simple</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why TrueTalk
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from real people who have found value in using TrueTalk
                  to share their honest feedback.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                  TrueTalk has been a game-changer for every organization. The
                  anonymous feedback has helped to identify and address critical
                  issues we would have never known about.”
                </blockquote>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                  “TrueTalk allows us to share the honest thoughts without fear
                  of backlash. It's a safe space to speak up.”
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Join TrueTalk now
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Sign up for TrueTalk and start sharing your honest feedback
                today.
              </p>
            </div>
          </div>
          <footer className="flex flex-col gap-2 sm:flex-row py-1 w-full shrink-0 items-center px-4 md:px-6">
            <p className="text-base mx-2 my-3 text-black dark:text-gray-400">
              © 2024 TrueTalk. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6 px-4">
              <p className="font-bold py-1">Contact Us: </p>
              <Link
                className="text-3xl hover:underline underline-offset-4"
                href="https://www.linkedin.com/in/yash-shinde-a3127028a/"
              >
                <FaLinkedin />
              </Link>
              <Link
                className="text-3xl hover:underline underline-offset-4"
                href="https://www.instagram.com/yash1310_/"
              >
                <FaSquareInstagram />
              </Link>
              <Link
                className="text-3xl hover:underline underline-offset-4"
                href="https://github.com/Yashshinde43"
              >
                <FaGithub />
              </Link>
            </nav>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default page;
