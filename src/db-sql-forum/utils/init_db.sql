
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    refresh_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@example.com', 'hashed_admin123', 'admin'),
('user1', 'user1@example.com', 'hashed_user123', 'user'),
('user2', 'user2@example.com', 'hashed_user456', 'user');


INSERT INTO posts (title, content, author_id) VALUES
('Welcome Post', 'This is a post from the admin.', 1),
('First User Post', 'Hello from user1!', 2),
('Another Post by User1', 'More content by user1.', 2),
('Hello from user2', 'Post content by user2.', 3);
