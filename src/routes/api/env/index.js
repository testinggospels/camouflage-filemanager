export async function get() {
    const env = {
        CF_FS_ROOT: process.env["CF_FS_ROOT"],
        CF_WRITE_PROTECTED: process.env["CF_WRITE_PROTECTED"],
    }
    return {
        status: 200,
        body: env
    }
}