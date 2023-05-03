//create function that does insert,,,
//nothing in the back end changes
//HERE  DO INSERT  of input INTO database TABLE
// AD ADD COOKIE TO BROWSER USERID
const spicedPg = require("spiced-pg");
const database = "social-network";
//when doing db queries we need to say WHO is doing them
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

console.log("[db] connecting to:", database);
//------------------------------------------------- Register-------------------------------------------------

module.exports.addUser = (firstName, lastName, email, password) => {
    //return db.query;

    const q = `INSERT INTO users (first, last, email, password) 
        VALUES ($1, $2, $3, $4)
        RETURNING id;`;
    const param = [firstName, lastName, email, password];
    return db.query(q, param);
};

//---------------------------------------------------------LOGIN---------------------------------------------

module.exports.findUser = (email) => {
    const q = `SELECT * FROM users
 WHERE email= $1`;
    const param = [email];
    return db.query(q, param);
};

//---------------------------------------------------------STORE SECRET CODE---------------------------------------------
module.exports.storeCode = (email, code) => {
    const q = `INSERT INTO codes (user_email, secret_code) 
        VALUES ($1, $2)
        RETURNING *;`;
    const param = [email, code];
    return db.query(q, param);
};
//---------------------------------------------------------COMPARE EMAILS FOR RESET PASSWORD---------------------------------------------

module.exports.compareCodes = (email) => {
    const q = `SELECT secret_code  FROM codes
WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
AND user_email = $1`;
    const param = [email];
    return db.query(q, param);
};

//---------------------------------------------------------Update password---------------------------------------------
module.exports.updatePassword = (password, email) => {
    const q = `UPDATE users
SET password = $1
WHERE email= $2
 RETURNING *;`;
    const param = [password, email];
    return db.query(q, param);
};

// --------------------------------------------- Get User data ---------------------------------------------------
module.exports.getUserData = (userId) => {
    const q = `SELECT first, last, imageurl, bio
    FROM users
    WHERE id = $1`;
    const param = [userId];
    return db.query(q, param);
};
// --------------------------------------------- Uploade profile picture---------------------------------------------------

module.exports.uploadImg = (url, userId) => {
    const q = `UPDATE users
    SET imageUrl = $1 
    WHERE id = $2
    RETURNING imageurl`;

    const param = [url, userId];
    return db.query(q, param);
};

// --------------------------------------------- Update BIO ---------------------------------------------------

module.exports.updateBio = (bio, userId) => {
    const q = `UPDATE users
    SET bio= $1 
    WHERE id = $2
    RETURNING bio`;

    const param = [bio, userId];
    return db.query(q, param);
};

// --------------------------------------------- find other users---------------------------------------------------

module.exports.getRecentUsers = () => {
    return db.query(`SELECT * FROM users
ORDER BY id DESC
LIMIT 12;`);
};

// --------------------------------------------- match users---------------------------------------------------

module.exports.matchUsers = (val) => {
    const q = `SELECT * FROM users
    WHERE first ILIKE $1
    LIMIT 12`;
    const param = [val + "%"];
    return db.query(q, param);
};

// --------------------------------------------- get Friendship infos ---------------------------------------------------

module.exports.getFriendship = (currentUser, otherUser) => {
    const q = `SELECT * FROM friendships
     WHERE (recipient_id = $1 AND sender_id = $2)
     OR (recipient_id = $2 AND sender_id = $1)`;

    const param = [currentUser, otherUser];
    return db.query(q, param);
};

// --------------------------------------------- Make Friend Request ---------------------------------------------------
module.exports.requestFriendship = (currentUser, otherUser) => {
    const q = `INSERT INTO friendships(sender_id, recipient_id)
     VALUES ($1, $2)
    `;
    const param = [currentUser, otherUser];
    return db.query(q, param);
};
// --------------------------------------------- Accept Friend Request ---------------------------------------------------

module.exports.acceptFriendship = (currentUser, otherUser) => {
    const q = `UPDATE friendships
    SET accepted = true
    WHERE (recipient_id = $1 AND sender_id = $2)
    `;
    const param = [currentUser, otherUser];
    return db.query(q, param);
};

// --------------------------------------------- cancel Request or unfriend---------------------------------------------------

module.exports.cancelFriendship = (currentUser, otherUser) => {
    const q = `DELETE FROM friendships
      WHERE (recipient_id = $1 AND sender_id = $2)
      OR (sender_id = $1 AND recipient_id = $2)`;
    const param = [currentUser, otherUser];
    return db.query(q, param);
};

// --------------------------------------------- get friends and wannabees ---------------------------------------------------

module.exports.getFriendsWannabees = (currentUser) => {
    const q = `SELECT users.id, first, last, imageUrl, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
      `;
    const param = [currentUser];
    return db.query(q, param);
};

// --------------------------------------------- get chat history ---------------------------------------------------

module.exports.getMessages = (roomName) => {
    const q = `SELECT messages.id, messages.room, messages.user_id, messages.message, users.first, users.last, users.imageUrl
     FROM messages
     JOIN users ON (user_id = users.id)
     WHERE messages.room = $1
    ORDER BY messages.id DESC
LIMIT 10;`;
    const param = [roomName];
    return db.query(q, param);
};

// --------------------------------------------- DM  ---------------------------------------------------
module.exports.getDms = (currentUser, otherUser) => {
    const q = `SELECT dms.id, dms.sender_id, dms.recipient_id, dms.message, users.first, users.last, users.imageUrl
     FROM dms
     JOIN users 
     ON (dms.sender_id = users.id)
    WHERE (dms.recipient_id = $1 AND dms.sender_id = $2)
    OR (dms.sender_id = $1 AND dms.recipient_id = $2)
     ORDER BY dms.id DESC
     LIMIT 10;`;
    const param = [currentUser, otherUser];
    return db.query(q, param);
};
// --------------------------------------------- add DM---------------------------------------------------

module.exports.addDm = (currentUser, otherUser, message) => {
    const q = `INSERT INTO dms (sender_id, recipient_id, message)
     VALUES ($1, $2, $3)
      RETURNING *
    `;
    const param = [currentUser, otherUser, message];
    return db.query(q, param);
};
// --------------------------------------------- add new message ---------------------------------------------------

module.exports.addMessage = (currentUser, room, message) => {
    const q = `INSERT INTO messages (user_id, room, message)
     VALUES ($1, $2, $3)
      RETURNING *
    `;
    const param = [currentUser, room, message];
    return db.query(q, param);
};

// --------------------------------------------- get list of online users---------------------------------------------------

module.exports.getOnlineUsers = (users) => {
    const q = `SELECT * FROM users
     WHERE id=ANY($1)`;
    const param = [users];
    return db.query(q, param);
};
