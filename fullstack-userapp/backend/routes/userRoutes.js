import express from "express";
import sql from "mssql";

const router = express.Router();

// API-endepunkt for registrering av bruker
router.post("/create", async (req, res) => {
  const { Email, Password, FirstName, LastName } = req.body;

  try {
    const result = await sql.query`
      EXEC RegisterUser @Email=${Email}, @Password=${Password}, @FirstName=${FirstName}, @LastName=${LastName}
    `;
    res.json(result.recordset);
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Internal server error");
  }
});

// API-endepunkt for innlogging av bruker
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const result = await sql.query`
      EXEC LoginUser @Email=${Email}, @Password=${Password}
    `;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Internal server error");
  }
});

// API-endepunkt for redigering av bruker
router.post("/edit", async (req, res) => {
  const { Token, NewFirstName, NewLastName } = req.body;

  try {
    const result = await sql.query`
      EXEC EditUser @Token=${Token}, @NewFirstName=${NewFirstName}, @NewLastName=${NewLastName}
    `;
    res.json(result.recordset);
  } catch (err) {
    console.error("Error editing user:", err);
    res.status(500).send("Internal server error");
  }
});

export default router;
