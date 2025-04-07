import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js"; // juster importen om nødvendig

// Registrering
export const registerUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "Alle feltene må fylles ut!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool
      .request()
      .input("email", email)
      .input("password", hashedPassword)
      .input("firstName", firstName)
      .input("lastName", lastName)
      .query(
        "INSERT INTO Users (Email, Password, FirstName, LastName) VALUES (@email, @password, @firstName, @lastName)"
      );

    res.status(201).json({ message: "Bruker registrert" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Feil ved registrering" });
  }
};

// Innlogging
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email og passord er påkrevd" });
  }

  try {
    const result = await pool
      .request()
      .input("email", email)
      .query("SELECT * FROM Users WHERE Email = @email");

    const user = result.recordset[0];
    if (!user) {
      return res.status(400).json({ message: "Bruker ikke funnet" });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Feil passord" });
    }

    const token = jwt.sign({ userId: user.UserID }, "secret_key", {
      expiresIn: "1h",
    });

    res.json({ message: "Innlogging vellykket", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Feil ved innlogging" });
  }
};

// Redigering
export const editUser = async (req, res) => {
  const { token, firstName, lastName } = req.body;

  if (!token || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "Token, fornavn og etternavn er påkrevd" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    const userId = decoded.userId;

    await pool
      .request()
      .input("userId", userId)
      .input("firstName", firstName)
      .input("lastName", lastName)
      .query(
        "UPDATE Users SET FirstName = @firstName, LastName = @lastName WHERE UserID = @userId"
      );

    res.json({ message: "Bruker oppdatert" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Feil ved oppdatering" });
  }
};
