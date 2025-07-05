-- Insert sample users
INSERT INTO users (name) VALUES 
('John Doe'),
('Jane Smith'),
('Bob Wilson'),
('Alice Johnson');

-- Insert sample tasks
INSERT INTO tasks (title, contents, status, user_id) VALUES 
('Complete project documentation', 'Write comprehensive documentation for the todo application project', 'todo', 1),
('Fix authentication bug', 'Resolve issue with user login not working properly', 'in_progress', 2),
('Design database schema', 'Create ERD and design optimal database structure', 'finished', 1),
('Implement API endpoints', 'Create REST API endpoints for CRUD operations', 'todo', 3),
('Setup Docker environment', 'Configure Docker containers for development', 'finished', 2),
('Create user interface', 'Design and implement React components for the frontend', 'in_progress', 4),
('Write unit tests', 'Implement comprehensive test suite for all components', 'todo', 3),
('Deploy to production', 'Configure production environment and deploy application', 'todo', 1),
('Code review session', 'Review code with team members and address feedback', 'finished', 4),
('Performance optimization', 'Optimize database queries and frontend performance', 'todo', 2);