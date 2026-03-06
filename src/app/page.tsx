import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">Study Groups</h1>
        <p className="text-xl text-gray-600 mb-8">
          Join collaborative study groups with real-time chat and Q&A
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg hover:bg-gray-300">
              Sign Up
            </button>
          </SignUpButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Create Groups</h3>
            <p className="text-gray-600">
              Form study groups by subject, year, and section
            </p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
            <p className="text-gray-600">
              Discuss topics instantly with group members
            </p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">?</div>
            <h3 className="text-xl font-semibold mb-2">Q&A Board</h3>
            <p className="text-gray-600">
              Ask questions and get answers in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
