import type { Route } from "./+types/home";
import { Link } from "react-router";
import prisma from "~/lib/prisma";

export async function loader() {
  const users = await prisma.user.findMany({
    include: {
      tasks: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  });
  return { users };
}

export default function UsersHome({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link
          to="/users/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </Link>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link
                  to={`/users/${user.id}`}
                  className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                >
                  {user.name}
                </Link>
                <p className="text-gray-600 text-sm mt-1">
                  {user.tasks.length} tasks assigned
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Created: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/users/${user.id}/edit`}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Edit
                </Link>
                <Link
                  to={`/users/${user.id}/delete`}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found.</p>
          <Link
            to="/users/new"
            className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
          >
            Create the first user
          </Link>
        </div>
      )}
    </div>
  );
}