export const migrations = `
  CREATE TABLE IF NOT EXISTS USERS (
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio VARCHAR(255),
    nickname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    github_account VARCHAR(255) NOT NULL
  );
  
  INSERT INTO users (email, name, bio, nickname, password, github_account) 
  SELECT 'admin', 'admin', 'system admin', 'admin', '$2a$12$okqCGvt1iglepFnMg/9zJud8itKI6PumqVmF2WpFmpxVP68gVXwr6', 'admin'
  WHERE NOT EXISTS (SELECT * FROM users WHERE email = 'admin');

  CREATE TABLE IF NOT EXISTS SPECIALTIES (
    user_email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_email, name),
    FOREIGN KEY (user_email) REFERENCES USERS (email) ON DELETE CASCADE ON UPDATE CASCADE
  );
  );
`;
