import { Types } from "./Types";

export const Tables = {
    cidades: {
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
        estados_id: {
            type: Types.INTEGER,
            primary_key: false,
            default_value: null,
        },
    },
    clientes: {
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
    }, 
    compras: {
        id: {
            type: Types.INTEGER,
            primary_key: true,
            default_value: null,
        },
    },
    estados: {
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
    },
    pedidos: {
        id: {
            type: Types.INTEGER,
            primary_key: true,
            default_value: null,
        },
    },
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
        accessToken: {
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
        id: {
            type: Types.INTEGER,
            primary_key: true,
            default_value: null,
        },
        jti: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        nome: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        }, 
        refreshToken: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        scope: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        tokenType: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
    },
};