DROP TABLE IF EXISTS tweets CASCADE;

CREATE TABLE tweets (
   id SERIAL PRIMARY KEY NOT NULL,

   title VARCHAR(255) NOT NULL,
   content VARCHAR(255) NOT NULL,

   writter VARCHAR(255) REFERENCES users(user_name) on DELETE CASCADE,
   
   posted_time TIMESTAMP DEFAULT NOW(),
   edited_time TIMESTAMP 



);