import React from 'react';
import { Dialog } from '@rneui/themed';

const Selecionar = (props) => {
    return (
        <>
            <Dialog
                isVisible={props.isVisible}
                onBackdropPress={props.onBackdropPress}
            >
                <Dialog.Title title="Selecione UF" />
                {/* {userlist.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={{
                            marginHorizontal: -10,
                            borderRadius: 8,
                        }}
                        onPress={toggleDialog6}
                    >
                        <Avatar rounded source={{ uri: l.avatar_url }} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: '700' }}>
                                {l.name}
                            </ListItem.Title>
                            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))} */}
            </Dialog>
        </>
    )
}

export default Selecionar;