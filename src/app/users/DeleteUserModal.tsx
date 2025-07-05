import React from 'react';
import type { User } from '../../lib/types/user';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface DeleteUserModalProps {
  isOpen: boolean;
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteUserModal({ isOpen, user, onConfirm, onCancel }: DeleteUserModalProps) {
  if (!user) return null;

  const hasActiveTasks = user._count && user._count.tasks > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Delete User"
      size="small"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Are you sure you want to delete this user?
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            <strong>{user.name}</strong>
          </p>
          
          {hasActiveTasks ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-800">
                    This user has {user._count?.tasks} active task(s). 
                    Deleting this user will also delete all their tasks.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-4">
              This action cannot be undone.
            </p>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Delete User
          </Button>
        </div>
      </div>
    </Modal>
  );
}