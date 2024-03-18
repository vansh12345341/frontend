import Link from "next/link"; 

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex space-x-4">
        <Link href="/add-submission" passHref>
          <div className="flex cursor-pointer flex-col items-center justify-center w-64 h-32 bg-white rounded-lg shadow-md hover:shadow-lg">
            <p className="text-blue-500 hover:text-blue-700 font-semibold">Add Submission</p>
          </div>
        </Link>
        <Link href="/view-submission" passHref>
          <div className="flex cursor-pointer flex-col items-center justify-center w-64 h-32 bg-white rounded-lg shadow-md hover:shadow-lg">
            <p className="text-blue-500 hover:text-blue-700 font-semibold">View Submissions</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
