import { Types } from "./Types";

export const Tables = {
    cidades: {
        ativo: {
            type: Types.BOOLEAN,
            primary_key: false,
            default_value: null,
        },
        criticas: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        estadosId: {
            type: Types.INTEGER,
            primary_key: false,
            default_value: null,
        },
        id: {
            type: Types.INTEGER,
            primary_key: true,
            default_value: null,
        },
        idLocal: {
            type: Types.INTEGER,
            primary_key: false,
            default_value: null,
        },
        nome: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        versao: {
            type: Types.INTEGER,
            primary_key: false,
            default_value: null,
        },
    },
    clientes: {
        apelidoNomeFantazia: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        ativo: {
            type: Types.BOOLEAN,
            primary_key: false,
            default_value: null,
        },
        celular: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        cpfCnpj: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        criticas: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        dataCadastro: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        email: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        empresasId: {
            type: Types.INTEGER,
            primary_key: false,
            default_value: null,
        },
        enderecosId: {
            type: Types.INTEGER,
            primary_key: false,
            default_value: null,
        },
        id: {
            type: Types.INTEGER,
            primary_key: true,
            default_value: null,
        },
        idLocal: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        nomeRazaoSocial: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        telefone: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        versao: {
            type: Types.INTEGER,
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
    endereco:{
	    bairro: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        cep: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        cidadesId:{
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
	    complemento: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        id: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        idLocal: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        logradouro:  {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
	    numero: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
    },
    estados: {
        ativo: {
            type: Types.BOOLEAN,
            primary_key: false,
            default_value: null,
        },
        criticas: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        id: {
            type: Types.INTEGER,
            primary_key: true,
            default_value: null,
        },
        idLocal: {
            type: Types.INTEGER,
            primary_key: false,
            default_value: null,
        },
        nome: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        uf: {
            type: Types.TEXT,
            primary_key: false,
            default_value: null,
        },
        versao: {
            type: Types.INTEGER,
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
        empresa: {
            type: Types.INTEGER,
            primary_key: false,
            default_value: null,
        },
        email: {
            type: Types.TEXT,
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
        senha: {
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