import React from 'react';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const BarraDePesquisa = (props) => {
    return (
        <>
            <SearchBar
                lightTheme={true}
                placeholder={`Digite o nome da cidade aqui...`}
                searchIcon={<Icon name='search' size={20} color='#8B97A3' onPress={() => {
                    //props.pesquisarObjetos();
                }} />}
                clearIcon={<Icon name='close' size={20} color='#8B97A3' 
                //onPress={() => props.limpaValor()}
                 />}
                //onChangeText={value => props.setValor(value)}
                //value={props.valor} 
                />
        </>
    );
}

export default BarraDePesquisa;