import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv'

export function dirStat(inputFolder) {
    dotenv.config();
    let fsRoot = path.resolve(process.env['FS_ROOT'] || process.cwd())
    if (inputFolder) {
        fsRoot = path.join(path.resolve(process.env['FS_ROOT'] || process.cwd()), inputFolder)
    }
    const files = fs.readdirSync(fsRoot)
    const dirStat = [];
    files.forEach(file => {
        let filePath = path.join(fsRoot, file);
        let stats = fs.lstatSync(filePath)
        let fileDetails = {
            file,
            createdTime: stats.ctime,
            modifiedTime: stats.mtime,
            isDirectory: stats.isDirectory(),
        }
        dirStat.push(fileDetails)
    });
    return dirStat;
}

export function readFile(inputFile) {
    dotenv.config();
    const fsRoot = path.join(path.resolve(process.env['FS_ROOT'] || process.cwd()), inputFile)
    const isDirectory = fs.lstatSync(fsRoot).isDirectory()
    if (isDirectory) {
        return {
            status: 400,
            body: {
                error: 'Directory can not be treated as a text file.'
            }
        }
    }
    return fs.readFileSync(fsRoot).toString()
}