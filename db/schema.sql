-- http://stackoverflow.com/a/13318869/3192470
DROP DATABASE IF EXISTS jwtAuthentication;
CREATE DATABASE jwtAuthentication;

\c jwtAuthentication;

CREATE TABLE users (
  username VARCHAR,
  password VARCHAR,
  name VARCHAR
);


-- dropdb -U postgres jwtAuthentication
-- createdb -U postgres jwtAuthentication
-- psql -d jwtAuthentication -U postgres -W -f db/schema.sql