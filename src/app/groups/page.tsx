import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
async function getGroups() {
  try {
    const groups = await prisma.group.findMany({
      include: {
        users: {
          select: { name: true },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: { createdAt: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
}

export default async function GroupsPage() {
  const { userId } = auth();
  const groups = await getGroups();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Study Groups</h1>
        <Link
          href="/groups/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Group
        </Link>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No groups
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new study group.
          </p>
          <div className="mt-6">
            <Link
              href="/groups/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Group
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Link href={`/groups/${group.id}`} key={group.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {group.name}
                </h2>
                <p className="text-gray-600 mb-3">{group.subject}</p>
                <div className="text-sm text-gray-500 mb-2">
                  Year {group.year} • Semester {group.semester} • Section{" "}
                  {group.section}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {group.users.length} members
                  </span>
                  <span className="text-gray-400">
                    {group.messages.length > 0
                      ? `Last activity ${new Date(group.messages[0].createdAt).toLocaleDateString()}`
                      : "No messages yet"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
