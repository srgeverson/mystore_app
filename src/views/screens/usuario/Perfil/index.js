import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Card, Text, Avatar } from 'react-native-elements';
import { getUsuarioLogado } from '../../../../services/UsuarioService';
import ModalCarregando from '../../../components/ModalCarregando';

const Perfil = () => {
    const [carregando, setCarregando] = useState(false);
    const [letrasNome, setLetrasNome] = useState(null);
    const [idUsuaario, setIdUsuario] = useState(null);
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);

    const [idEmpresa, setIdEmpresa] = useState(null);
    const [nomeApelido, setNomeApelido] = useState(null);
    const [nomeRazaoSocial, setNomeRazaoSocial] = useState(null);

    const recuperaTokenSalvo = async () => {
        setCarregando(true);
        const usuario = await getUsuarioLogado();
        if (usuario) {
            setIdUsuario(usuario.id);
            setNome(usuario.nome);
            setEmail(usuario.email);
            let letras = usuario.nome.split(' ');
            setLetrasNome(letras[0].substr(0,1)+letras[1].substr(0,1));
            console.log();
            setIdEmpresa(usuario.empresa);
            setNomeApelido(usuario.nomeApelido);
            setNomeRazaoSocial(usuario.nomeApelido);
        }
        setCarregando(false);
    }

    useEffect(() => {
        recuperaTokenSalvo();
    }, [])

    return (
        <SafeAreaView>
            <Card containerStyle={{ marginTop: 15 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Avatar
                        size={100}
                        rounded
                        title={letrasNome}
                        containerStyle={{ marginBottom: 30, backgroundColor: '#00a7f7' }}
                    />
                </View>
                <Card.Title>
                    <Text >Dados do Usuário</Text>
                </Card.Title>
                <Card.Divider />
                <Text style={{marginTop:10}}>Código: {idUsuaario}</Text>
                <Text style={{marginTop:10}}>Nome: {nome}</Text>
                <Text style={{marginTop:10}}>E-mail: {email}</Text>
                <Card.Title style={{marginTop:20}}>
                    <Text >Dados da Empresa</Text>
                </Card.Title>
                <Card.Divider />
                <Text style={{marginTop:10}}>Código: {idEmpresa}</Text>
                <Text style={{marginTop:10}}>Nome/Apelido: {nomeApelido}</Text>
                <Text style={{marginTop:10}}>Razão Social: {nomeRazaoSocial}</Text>
            </Card>
            {carregando && <ModalCarregando pagina='Informações do Usuário' />}
        </SafeAreaView>
    )
}

export default Perfil;