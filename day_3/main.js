import { readFile, parseSchematicNumbers } from "../general/fileReader.js";
import { parseSymbolMap } from "./MapParser.js";

let file = './day_3/data.txt';

const symbolMatrix = parseSymbolMap(file);
