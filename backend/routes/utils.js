import path from 'path';

export function getDirname() {
    return path.dirname(new URL(import.meta.url).pathname);
}
