export const createDatabaseTables = `
  CREATE TABLE IF NOT EXISTS USERS (
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    githubAccount VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS SPECIALTIES (
    user_email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_email, name),
    FOREIGN KEY (user_email) REFERENCES USERS (email) ON DELETE SET NULL ON UPDATE CASCADE
  );
`;
