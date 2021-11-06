export async function get() {
    const env = {
        FS_ROOT: process.env["FS_ROOT"] ? process.env["FS_ROOT"] : process.cwd(),
        WRITE_PROTECTED: process.env["WRITE_PROTECTED"] ? process.env["WRITE_PROTECTED"] : 'true',
    }
    return {
        status: 200,
        body: env
    }
}