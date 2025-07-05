import React, { useState } from 'react';
import type { User } from '../../lib/types/user';
import { Button } from '../ui/Button';

interface UserFormProps {
  user?: User;
  onSubmit: (data: { name: string }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  error?: string;
}

export function UserForm({ user, onSubmit, onCancel, isSubmitting = false, error }: UserFormProps) {
  const [name, setName] = useState(user?.name || '');
  const [nameError, setNameError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!name.trim()) {
      setNameError('Name is required');
      return;
    }
    
    if (name.trim().length > 255) {
      setNameError('Name must be less than 255 characters');
      return;
    }
    
    setNameError('');
    onSubmit({ name: name.trim() });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (nameError) {
      setNameError('');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {user ? 'Edit User' : 'Add New User'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              nameError ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter user name"
          />
          {nameError && (
            <p className="mt-1 text-sm text-red-600">{nameError}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (user ? 'Update User' : 'Create User')}
          </Button>
        </div>
      </form>
    </div>
  );
}