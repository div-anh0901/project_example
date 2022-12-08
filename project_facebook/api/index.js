const express = require("express");
const app = express();
const connectDB = require("./config");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");
const multer = require("multer");
const authRouter = require("./router/auth");
const postRouter = require("./router/posts");
const userRouter = require("./router/users");
const conversationRouter = require("./router/conversation");
const messageRouter = require("./router/message");
connectDB();
dotenv.config();
const port = 5000;

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/images");
  },
  filename: (req, file, cd) => {
    cd(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File upload successfully!");
  } catch (e) {
    console.log(e);
  }
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port 5000!`));
