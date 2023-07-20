const con = require("./db_connect");

// Create Table
async function createTable() {
	let sql = `CREATE TABLE if not exists notes(
        noteID INT NOT NULL AUTO_INCREMENT,
        note VARCHAR(100) NOT NULL UNIQUE,
        userID INT,
        CONSTRAINT notePK PRIMARY KEY(noteID),
        CONSTRAINT FOREIGN KEY (userID) REFERENCES users(userID)

    );`
	await con.query(sql);
}

createTable();

// Getting all notes
async function getAllNotes() {
	const sql = `SELECT * FROM notes;`;
	let notes = await con.query(sql);
	console.log(notes);
	return await notes;
}

// Creating a new note
async function createNote(note) {
	let cNote = await getNote(note);
	const sql = `INSERT INTO notes(note,userID) VALUES ("${note.note}",${note.userID});`
	await con.query(sql);
	return cNote[0];
}

// Editing note
async function editNote(note) {
	let sql = `UPDATE notes SET note="${note.note}" where noteID=${note.noteID}`;
	await con.query(sql);
	let updatedNote = await getNote(note);
	return updatedNote[0];
}

// Deleting note
async function deleteNote(note) {
	let sql = `DELETE from users where noteID=${note.noteID}`;
	await con.query(sql);
}

// Getting note based on noteId
async function getNote(note) {
	let sql;
	if (note.noteID) {
		sql = `SELECT * from notes where noteID=${note.noteID}`;
	} else {
		sql = `SELECT * from notes where userID=${note.userID}`;
	}
	return await con.query(sql);
}

module.exports = {
	getAllNotes,
	createNote,
	editNote,
	deleteNote,
	getNote
};