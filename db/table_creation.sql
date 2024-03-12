
CREATE DATABASE facebook;

CREATE Table
    users(
        id SERIAL NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        dob DATE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        token VARCHAR(255),
        profile_pic_url TEXT,
        PRIMARY KEY (id)
    );

-- TRUNCATE table users;

-- SELECT * FROM users;

-- select profile_pic_url from users where profile_pic_url is not null;

-- drop table users;

CREATE Table
    posts(
        id SERIAL NOT NULL UNIQUE,
        users_id INT,
        post_content TEXT,
        post_image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (id),
        FOREIGN KEY (users_id) REFERENCES users(id)
    );

-- SELECT

--     posts.post_content,

--     posts.post_image_url,

--     posts.created_at,

--     users.first_name,

--     users.last_name,

--     users.profile_pic_url

-- FROM users

--     inner join posts on users.id = posts.users_id

-- where users.id = 1;

-- SELECT * FROM posts;

-- drop Table posts;