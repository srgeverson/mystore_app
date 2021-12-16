import { Types } from "./Types";

export const Tables = {
    permissoes: {
        id: {
            type: Types.INTEGER,
            primary_key: true,
            default_value: null,
        },
        nome: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        descricao: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        ativo: {
            type: Types.BOOLEAN,
            primary_key: false,
            default_value: null,
        },
    },
    usuarios: {
        id: {
            type: Types.INTEGER,
            primary_key: true,
            default_value: null,
        },
        nome: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        tokenType: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        accessToken: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        scope: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        jti: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        data: {
            type: Types.DATETIME,
            primary_key: false,
            default_value: null,
        },
        expiresIn: {
            type: Types.LONG,
            primary_key: false,
            default_value: null,
        },
    },
};