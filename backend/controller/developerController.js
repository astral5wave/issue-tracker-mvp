const asyncHandeler = require("express-async-handler");
const Developer = require("../models/developerModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register Developer
//@route POST /api/developer/register
const registerDeveloper = asyncHandeler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(401).json({ message: "Registration field is missing" })
    }
    const developerFind = await Developer.findOne({ email });
    if (developerFind) {
        return res.status(401).json({ message: "Developer already exists" })
    }

    const firstWord = name.trim().split(' ')[0].toLowerCase();
    const username = `${firstWord}${Date.now()}`;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const developerCreated = await Developer.create({ name, email, password: hashedPassword, username });
        const token = jwt.sign(
            {
                role: "developer",
                data: {
                    id: developerCreated._id,
                    name: developerCreated.name,
                    email: developerCreated.email,
                    userName: developerCreated.username,
                }
            },
            process.env.SECRET,
            { expiresIn: "24h" }
        );
        const developerCreatedObj = developerCreated.toObject();
        developerCreatedObj.token = token;
        return res.status(200).json(developerCreatedObj);
    }
    catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
})

//@desc Login Developer
//@route POST /api/developer/login
const loginDeveloper = asyncHandeler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: "Login field is missing, kindly enter email and password" })
    }
    try {
        const developerFind = await Developer.findOne({ email });
        if (developerFind && await bcrypt.compare(password, developerFind.password)) {
            const token = jwt.sign(
                {
                    role: "developer",
                    data: {
                        id: developerFind._id,
                        name: developerFind.name,
                        email: developerFind.email,
                        userName: developerFind.username,
                    }
                },
                process.env.SECRET,
                { expiresIn: "24h" });
            const developerFindObj = developerFind.toObject(); //JSON string to Object
            developerFindObj.token = token;
            return res.status(200).json(developerFindObj);
        }
        else {
            return res.status(400).json({ message: "Enter a valid email and password" });
        }
    }
    catch (e) {
        console.log(e.message);
        return res.status(401).json({ message: e.message });
    }
})

//@desc Add department and project for developer
//@route POST /api/developer/:username/assignFields
const assignFields = asyncHandeler(async (req, res) => {
    const { username } = req.params;
    const { department, project } = req.body;
    const developer = await Developer.findOne({ username });

    if (!developer) {
        return res.status(404).json({ message: "Developer not found" });
    }
    developer.department = department || developer.department;
    developer.project = project || developer.project;
    await developer.save();
    res.status(200).json({ message: "Fields assigned successfully", developer: developer });
})

module.exports = { registerDeveloper, loginDeveloper, assignFields }