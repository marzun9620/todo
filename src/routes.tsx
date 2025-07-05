import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { UserList } from './app/users/UserList';
import { UserForm } from './app/users/UserForm';
import type { User } from './lib/types/user';

// Users List Route
export async function usersLoader() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const data = await response.json();
    return { users: data.users };
  } catch (error) {
    console.error('Error in usersLoader:', error);
    throw new Response(`Failed to load users: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}

export function UsersRoute() {
  const { users } = useLoaderData() as { users: User[] };
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
}


export function NewUserRoute() {
  const navigate = useNavigate();

  const handleSubmit = async (data: { name: string }) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }
      
      // Navigate back to users list on success
      navigate('/users');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create user');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <UserForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

// Edit User Route
export async function editUserLoader({ params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      throw new Response('Invalid user ID', { status: 400 });
    }
    
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Response('User not found', { status: 404 });
      }
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch user');
    }
    
    const data = await response.json();
    return { user: data.user };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    throw new Response('Failed to load user', { status: 500 });
  }
}


export function EditUserRoute() {
  const { user } = useLoaderData() as { user: User };
  const navigate = useNavigate();

  const handleSubmit = async (data: { name: string }) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }
      
      // Navigate back to users list on success
      navigate('/users');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update user');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <UserForm
        user={user}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}