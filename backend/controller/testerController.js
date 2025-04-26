const asyncHandeler = require("express-async-handler");
const Tester = require("../models/testerModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register Tester
//@route /api/tester/register
const registerTester = asyncHandeler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(401).json({ message: "Registration field is missing" })
    }
    const testerFind = await Tester.findOne({ email });
    if (testerFind) {
        return res.status(401).json({ message: "Tester already exists" })
    }

    const firstWord = name.trim().split(' ')[0].toLowerCase();
    const username = `${firstWord}${Date.now()}`;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const testerCreated = await Tester.create({ name, email, password: hashedPassword, username });
        const token = jwt.sign(
            {
                role: "tester",
                data: {
                    id:testerCreated._id,
                    name: testerCreated.name,
                    email: testerCreated.email,
                    userName: testerCreated.username,
                }
            },
            process.env.SECRET,
            { expiresIn: "24h" }
        );
        const testerCreatedObj = testerCreated.toObject();
        testerCreatedObj.token = token;
        return res.status(200).json(testerCreatedObj);
    }
    catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
})

//@desc Login Tester
//@route /api/tester/login
const loginTester = asyncHandeler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: "Login field is missing, kindly enter email and password" })
    }
    try {
        const testerFind = await Tester.findOne({ email });
        if (testerFind && await bcrypt.compare(password, testerFind.password)) {
            const token = jwt.sign(
                {
                    role: "tester",
                    data: {
                        id: testerFind._id,
                        name: testerFind.name,
                        email: testerFind.email,
                        userName: testerFind.username,
                    }
                },
                process.env.SECRET,
                { expiresIn: "24h" });
            const testerFindObj = testerFind.toObject(); //JSON string to Object
            testerFindObj.token = token;
            return res.status(200).json(testerFindObj);
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

//@desc Add project for tester
//@route POST /api/tester/:username/assignFields
const assignFields = asyncHandeler(async (req, res) => {
    const { username } = req.params;
    const { project } = req.body;
    const tester = await Tester.findOne({ username });

    if (!tester) {
        return res.status(404).json({ message: "Tester not found" });
    }
    tester.project = project || tester.project;
    await tester.save();
    res.status(200).json({ message: "Fields assigned successfully", tester: tester });
})


module.exports = { registerTester, loginTester, assignFields }