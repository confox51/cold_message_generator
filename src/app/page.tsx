import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Generator</h1>
          <a 
            href="/prompt" 
            className="rounded-full bg-foreground text-background px-6 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            AI Prompt Interface
          </a>
        </div>
        
        <div className="w-full space-y-4">
          <div>
            <label htmlFor="person" className="block text-sm font-medium mb-1">Person's Name</label>
            <input
              type="text"
              id="person"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              placeholder="Enter the person's name"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">Company Information</label>
            <textarea
              id="company"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 min-h-[100px]"
              placeholder="Enter company name and description"
            />
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium mb-1">LinkedIn Profile</label>
            <input
              type="url"
              id="linkedin"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              placeholder="Enter LinkedIn profile URL"
            />
          </div>

          <div>
            <label htmlFor="points" className="block text-sm font-medium mb-1">Discussion Points</label>
            <textarea
              id="points"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 min-h-[100px]"
              placeholder="Enter your discussion points"
            />
          </div>

          <div>
            <label htmlFor="example" className="block text-sm font-medium mb-1">Example Email</label>
            <textarea
              id="example"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 min-h-[200px]"
              placeholder="Enter an example email"
            />
          </div>
        </div>

        <button className="rounded-full bg-foreground text-background px-6 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc]">
          Generate Email
        </button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
