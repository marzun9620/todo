import { db } from '../db';
import type { User, CreateUserData, UpdateUserData, ValidationError } from '../types/user';

export function validateUser(data: CreateUserData | UpdateUserData): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  
  if (data.name && data.name.trim().length > 255) {
    errors.push({ field: 'name', message: 'Name must be less than 255 characters' });
  }
  
  return errors;
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await db.users.findMany({
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
        _count: {
          select: {
            tasks: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const user = await db.users.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            tasks: true
          }
        }
      }
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function createUser(data: CreateUserData): Promise<User> {
  const errors = validateUser(data);
  if (errors.length > 0) {
    throw new Error(errors.map(e => e.message).join(', '));
  }

  try {
    const user = await db.users.create({
      data: {
        name: data.name.trim()
      },
      include: {
        _count: {
          select: {
            tasks: true
          }
        }
      }
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function updateUser(id: number, data: UpdateUserData): Promise<User> {
  const errors = validateUser(data);
  if (errors.length > 0) {
    throw new Error(errors.map(e => e.message).join(', '));
  }

  try {
    const user = await db.users.update({
      where: { id },
      data: {
        name: data.name.trim(),
        updated_at: new Date()
      },
      include: {
        _count: {
          select: {
            tasks: true
          }
        }
      }
    });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    // Delete user and cascade delete tasks (handled by database schema)
    await db.users.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to delete user');
  }
}