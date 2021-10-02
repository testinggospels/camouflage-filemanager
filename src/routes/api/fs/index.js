import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv'

export async function get() {
    dotenv.config();
    const fsRoot = path.resolve(process.env['FS_ROOT'])
    const files = fs.readdirSync(fsRoot)
    const response = [];
    files.forEach(file => {
        let filePath = path.join(fsRoot, file);
        let stats = fs.lstatSync(filePath)
        let fileDetails = {
            file,
            createdTime: stats.ctime,
            modifiedTime: stats.mtime,
            isDirectory: stats.isDirectory(),
        }
        response.push(fileDetails)
    });
    return {
        status: 200,
        body: response
    }
}