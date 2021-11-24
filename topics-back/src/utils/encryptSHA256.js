import crypto from 'crypto';

const encryptSHA256 = value => crypto.createHash("sha256").update(value).digest("hex");

export default encryptSHA256;
