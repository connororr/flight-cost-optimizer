/**
 * v0 by Vercel generated the initial template.
 * @see https://v0.dev/t/GPJs8mCGJWO
 */
import React from 'react'
import { CardContent, CardFooter, Card } from "@/components/shadcn/card"

export default function FlightDetailsLoading() {
    const timesToRepeat: number = 3;
  
    return (
      <Card className="w-full max-w-3xl bg-white p-4 shadow-lg flex m-[10px]">
        <CardContent className="flex-1">
          {[...Array(timesToRepeat)].map((_, index) => (
            <div key={index} className={`flex items-center justify-between ${index > 0 ? 'border-t border-gray-200' : ''} pt-4 pb-4`}>
              <div className="flex items-center space-x-4">
                <PlaneIcon className="h-6 w-6" />
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col justify-center ml-4 border-l border-gray-200">
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
        </CardFooter>
      </Card>
    );
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}
