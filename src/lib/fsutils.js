import fs from 'fs-extra'
import path from 'path';
import dotenv from 'dotenv'
dotenv.config();

export function dirStat(inputFolder) {
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

export function deleteFile(inputFile) {
    const fsRoot = path.resolve(process.env["FS_ROOT"] || process.cwd())
    const delResource = path.join(fsRoot, inputFile)
    const parent = path.dirname(delResource)
    try {
        fs.removeSync(delResource)
        if (parent === fsRoot) {
            return dirStat();
        } else {
            return dirStat(parent.replace(fsRoot, ""))
        }
    } catch (err) {
        return { error: true, message: err.message }
    }
}

export function createFolder(inputFile) {
    const fsRoot = path.resolve(process.env["FS_ROOT"] || process.cwd())
    const file = path.join(fsRoot, inputFile)
    fs.mkdirpSync(file);
    return create(file, fsRoot)
}
export function createFile(inputFile) {
    const fsRoot = path.resolve(process.env["FS_ROOT"] || process.cwd())
    const file = path.join(fsRoot, inputFile)
    fs.createFileSync(file);
    return create(file, fsRoot);
}

function create(createPath, fsRoot) {
    const parent = path.dirname(createPath)
    try {
        if (parent === fsRoot) {
            return dirStat()
        } else {
            return dirStat(parent.replace(fsRoot, ""))
        }
    } catch (err) {
        return { error: true, message: err.message }
    }
}

export function writeFile(inputFile, content) {
    const fsRoot = path.resolve(process.env["FS_ROOT"] || process.cwd())
    const file = path.join(fsRoot, inputFile)
    try {
        fs.writeFileSync(file, content)
        return "success";
    } catch (err) {
        return err.message;
    }
}

export function copy(source, dest) {
    try {
        const fsRoot = path.resolve(process.env["FS_ROOT"] || process.cwd())
        fs.emptyDirSync(path.basename(source));
        fs.copySync(path.join(fsRoot, source), path.join(fsRoot, dest, path.basename(source)), { overwrite: false, errorOnExist: true })
        return { success: true }
    } catch (err) {
        return { success: false, err: err.message }
    }
}

export function cut(source, dest) {
    try {
        const fsRoot = path.resolve(process.env["FS_ROOT"] || process.cwd());
        fs.emptyDirSync(path.basename(source));
        fs.moveSync(path.join(fsRoot, source), path.join(fsRoot, dest, path.basename(source)), { overwrite: false });
        return { success: true }
    } catch (err) {
        return { success: false, err: err.message }
    }
}