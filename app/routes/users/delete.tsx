import { data } from "react-router";
import type { Route } from "./+types/delete";
import { Form, redirect } from "react-router";
import prisma from "~/lib/prisma";

export async function loader({ params }: Route.LoaderArgs) {
  const { userId } = params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      tasks: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!user) {
    throw data("User Not Found", { status: 404 });
  }
  return { user };
}

export async function action({ params }: Route.ActionArgs) {
  const { userId } = params;
  
  try {
    // Check if user has tasks
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        tasks: {
          select: { id: true },
        },
      },
    });

    if (!user) {
      throw data("User Not Found", { status: 404 });
    }

    // Prevent deletion if user has tasks
    if (user.tasks.length > 0) {
      return Response.json(
        { error: "Cannot delete user with assigned tasks. Please reassign or delete the tasks first." },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: parseInt(userId) },
    });
  } catch (error: any) {
    console.error("Failed to delete user:", error);
    return Response.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }

  return redirect("/users");
}

export default function DeleteUser({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  const hasAssignedTasks = user.tasks.length > 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-red-600">Delete User</h1>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-red-800 mb-2">
          Are you sure you want to delete this user?
        </h2>
        <p className="text-red-700 mb-2">
          <strong>User:</strong> {user.name}
        </p>
        <p className="text-red-700 mb-2">
          <strong>Tasks assigned:</strong> {user.tasks.length}
        </p>
        
        {hasAssignedTasks && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded">
            <p className="text-red-800 font-medium">
              ⚠️ This user cannot be deleted because they have assigned tasks:
            </p>
            <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
              {user.tasks.map((task) => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-red-700">
              Please reassign or delete these tasks before deleting the user.
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {!hasAssignedTasks && (
          <Form method="post" className="flex-1">
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete User
            </button>
          </Form>
        )}
        <a
          href={`/users/${user.id}`}
          className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-center"
        >
          Cancel
        </a>
      </div>
    </div>
  );
}