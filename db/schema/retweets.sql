DROP TABLE IF EXISTS retweets CASCADE;

CREATE TABLE retweets (
   id SERIAL PRIMARY KEY NOT NULL,
   oiginal_tweeted_id INTEGER REFERENCES tweets  on DELETE CASCADE,
   retweeted_id INTEGER REFERENCES tweets on DELETE CASCADE,
  
   retweeted_time TIMESTAMP NOT NULL

   
);