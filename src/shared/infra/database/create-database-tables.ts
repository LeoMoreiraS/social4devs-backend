export const createDatabaseTables = `
  CREATE TABLE IF NOT EXISTS USERS (
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio VARCHAR(255),
    nickname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    github_account VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS SPECIALTIES (
    user_email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_email, name),
    FOREIGN KEY (user_email) REFERENCES USERS (email) ON DELETE SET NULL ON UPDATE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS POSTS (
    publisher_email VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    PRIMARY KEY (publisher_email, body),
    FOREIGN KEY (publisher_email) REFERENCES USERS (email) ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE TABLE IF NOT EXISTS LIKES (
    post_email VARCHAR(255) NOT NULL,
    post_body VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    PRIMARY KEY (post_email, post_body, user_email),
    FOREIGN KEY (post_email, post_body) REFERENCES POSTS (publisher_email, body) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE SET NULL ON UPDATE CASCADE
  );
`;
