import fs from "fs";
import { json } from "stream/consumers";

export class JsonHelper {
    static readJson(filepath:string): Record<string,string>[] {
        return JSON.parse(fs.readFileSync(filepath,"utf-8"));

    }
}