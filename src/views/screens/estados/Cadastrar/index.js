import React, { useEffect, useState } from 'react';
import { Picker, SafeAreaView } from 'react-native';
//import {Picker} from '@react-native-community/picker';
import { SearchBar, SpeedDial, Text, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { buscarPorConterNome, cadastrar, getCidades } from '../../../../services/CidadeService';
import ModalCarregando from '../../../components/ModalCarregando';

const Listar = () => {

    const [carregando, setCarregando] = useState(false);
    const [selectedValue, setSelectedValue] = useState("java");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
            {carregando && <ModalCarregando pagina='Cadastrando estado' />}
        </SafeAreaView>
    )
}

export default Listar;