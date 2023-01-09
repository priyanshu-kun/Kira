
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
import dotenv from "dotenv"
dotenv.config({path: __dirname + '/.env' })