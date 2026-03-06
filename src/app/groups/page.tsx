import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

async function getGroups() {
  const groups = await prisma.group.findMany({
    include: {
      users: {
        select: { name: true },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return groups;
}

export default async function GroupsPage() {
  const { userId } = await auth();
  const groups = await getGroups();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Study Groups</h1>
        <Link
          href="/groups/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Group
        </Link>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-600">No study groups yet.</p>
          <p className="text-gray-500 text-sm mt-2">
            Be the first to create one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Link href={`/groups/${group.id}`} key={group.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
                <p className="text-gray-600 mb-3">{group.subject}</p>
                <div className="text-sm text-gray-500 mb-2">
                  Year {group.year} • Sem {group.semester} • Section{" "}
                  {group.section}
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{group.users.length} members</span>
                  <span>
                    {group.messages.length > 0
                      ? `Last message ${new Date(group.messages[0].createdAt).toLocaleDateString()}`
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
