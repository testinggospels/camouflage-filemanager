import fs from 'fs-extra'
import path from 'path';
import dotenv from 'dotenv'
dotenv.config();

export function dirStat(inputFolder) {
    let fsRoot = path.resolve(process.env['VITE_FS_ROOT'] || process.cwd())
    if (inputFolder) {
        fsRoot = path.join(path.resolve(process.env['VITE_FS_ROOT'] || process.cwd()), inputFolder)
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
    const fsRoot = path.join(path.resolve(process.env['VITE_FS_ROOT'] || process.cwd()), inputFile)
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

export function deleteFile(inputFile) {
    const fsRoot = path.join(path.resolve(process.env["VITE_FS_ROOT"] || process.cwd()), inputFile)
    try {
        fs.removeSync(fsRoot)
        return { success: true, message: 'Deleted successfully' }
    } catch (err) {
        return { success: false, message: err.message }
    }
}