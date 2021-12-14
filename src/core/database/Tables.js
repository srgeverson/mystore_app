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
        ativo: {
            type: Types.BOOLEAN,
            primary_key: false,
            default_value: null,
        },
    },
};