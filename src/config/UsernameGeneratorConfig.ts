import { adjectives, Config, names } from "unique-names-generator";

export const customConfig: Config = {
    dictionaries: [adjectives, names],
    separator: '-',
    length: 2,
};