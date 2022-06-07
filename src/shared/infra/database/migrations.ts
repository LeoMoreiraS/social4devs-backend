export const migrations = `
  CREATE TABLE IF NOT EXISTS USERS (
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio VARCHAR(255),
    nickname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    githubAccount VARCHAR(255) NOT NULL
  );
  
  INSERT INTO users (email, name, bio, nickname, password, githubAccount) 
  SELECT 'admin', 'admin', 'system admin', 'admin', '$2a$12$okqCGvt1iglepFnMg/9zJud8itKI6PumqVmF2WpFmpxVP68gVXwr6', 'admin'
  WHERE NOT EXISTS (SELECT * FROM users WHERE email = 'admin');

  CREATE TABLE IF NOT EXISTS SPECIALTIES (
    user_email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_email, name),
    FOREIGN KEY (user_email) REFERENCES USERS (email) ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE TABLE IF NOT EXISTS USERS_FOLLOWS (
    email_follower VARCHAR(255) NOT NULL,
    email_followed VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (email_follower, email_followed),
    FOREIGN KEY (email_follower) REFERENCES USERS (email) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (email_followed) REFERENCES USERS (email) ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE TABLE IF NOT EXISTS MESSAGES (
    id SERIAL PRIMARY KEY,
    email_sender VARCHAR(255) NOT NULL,
    email_receiver VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email_sender) REFERENCES USERS (email) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (email_receiver) REFERENCES USERS (email) ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE TABLE IF NOT EXISTS POSTS (
    publisher_email VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (publisher_email, body),
    FOREIGN KEY (publisher_email) REFERENCES USERS (email) ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE TABLE IF NOT EXISTS LIKES (
    post_email VARCHAR(255) NOT NULL,
    post_body VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_email, post_body, user_email),
    FOREIGN KEY (post_email, post_body) REFERENCES POSTS (publisher_email, body) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE TABLE IF NOT EXISTS COMMENTARIES (
    post_email VARCHAR(255) NOT NULL,
    commentary VARCHAR(255) NOT NULL,
    post_body VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_email, post_body, user_email, commentary),
    FOREIGN KEY (post_email, post_body) REFERENCES POSTS (publisher_email, body) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE
  );
`;
