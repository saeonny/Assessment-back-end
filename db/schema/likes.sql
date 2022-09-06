DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE likes (
   tweet_id INTEGER REFERENCES tweets  on DELETE CASCADE,
   user_name VARCHAR REFERENCES users  on DELETE CASCADE,
   PRIMARY key (tweet_id, user_name)


);


-- making tweet_id and user_name as PRIMARY key can avoid user to "like" single post twice