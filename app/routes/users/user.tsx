import { data } from "react-router";
import type { Route } from "./+types/user";
import { Link } from "react-router";
import prisma from "~/lib/prisma";

export async function loader({ params }: Route.LoaderArgs) {
  const { userId } = params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      tasks: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    throw data("User Not Found", { status: 404 });
  }
  return { user };
}

export default function UserDetail({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  const tasksByStatus = {
    FINISHED: user.tasks.filter(task => task.status === "FINISHED"),
    IN_PROGRESS: user.tasks.filter(task => task.status === "IN_PROGRESS"),
    UNFINISHED: user.tasks.filter(task => task.status === "UNFINISHED"),
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600 mt-1">
            {user.tasks.length} tasks assigned
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Created: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/users/${user.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit User
          </Link>
          <Link
            to="/users"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Users
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Task Status Sections */}
        {Object.entries(tasksByStatus).map(([status, tasks]) => (
          <div key={status} className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 capitalize">
              {status.replace("_", " ").toLowerCase()} ({tasks.length})
            </h3>
            {tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="border-l-4 border-blue-200 pl-4 py-2"
                  >
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {task.content}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.status === "FINISHED" 
                          ? "bg-green-100 text-green-800"
                          : task.status === "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {task.status.replace("_", " ")}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No tasks in this status</p>
            )}
          </div>
        ))}
      </div>

      {user.tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks assigned to this user.</p>
          <Link
            to="/tasks/new"
            className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
          >
            Create a task
          </Link>
        </div>
      )}
    </div>
  );
}