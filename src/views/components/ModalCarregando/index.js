import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native-elements";
import styles from "./styles";

const ModalCarregando = (props) => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text} h4={true}>{props.pagina}</Text>
                <Text style={styles.text} h6={true}>Aguarde...</Text>
                <ActivityIndicator size="large" color="#FFF" />
            </View>
        </>
    );
}

export default ModalCarregando;