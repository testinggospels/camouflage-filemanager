import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv'

export async function get({ params }) {
    dotenv.config();
    const { sub } = params;
    const fsRoot = path.join(path.resolve(process.env['FS_ROOT']), sub)
    const isDirectory = fs.lstatSync(fsRoot).isDirectory()
    const response = [];
    if (isDirectory) {
        return {
            status: 400,
            body: {
                error: 'Directory can not be treated as a text file.'
            }
        }
    }
    const fileContent = fs.readFileSync(fsRoot).toString()
    return {
        status: 200,
        body: {
            fileContent
        }
    }

}