export declare const readFilep: (...args: any[]) => Promise<any>;
export declare const rimrafp: (...args: any[]) => Promise<any>;
export declare const writeFileAtomicp: any;
export declare function readJsonp(jsonPath: string): Promise<any>;
export interface ReadFileP {
    (path: string, encoding: string): Promise<string>;
}
export declare function nop(): void;
/**
 * Find the tsconfig.json, read it, and return parsed contents.
 * @param rootDir Directory where the tsconfig.json should be found.
 */
export declare function getTSConfig(rootDir: string, customReadFilep?: ReadFileP): Promise<{}>;
