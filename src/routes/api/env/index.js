export async function get() {
    const env = {
        FS_ROOT: process.env["FS_ROOT"],
        WRITE_PROTECTED: process.env["WRITE_PROTECTED"],
    }
    return {
        status: 200,
        body: env
    }
}