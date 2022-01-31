import React, {useState} from 'react';
import {Button, Portal, Modal, Title, TextInput} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const InboxModal = () => {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 30};

    return (
        <View style={styles.container}>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    style={styles.containerModal}
                    contentContainerStyle={containerStyle}>
                    <Title style={styles.title}>Send a Direct Message</Title>
                    <TextInput
                        style={styles.textInput}
                        label="Username"
                        mode="outlined"
                    />
                    <TextInput
                        style={styles.textInput}
                        label="Message"
                        mode="outlined"
                        multiline={true}
                        numberOfLines={5}
                    />
                    <Button
                        style={styles.buttons}
                        icon="email"
                        mode="contained"
                        onPress={() => {}}>
                        Send Message
                    </Button>
                    <Button style={styles.buttons} onPress={hideModal}>
                        Cancel
                    </Button>
                </Modal>
            </Portal>
            <View style={styles.container}>
                <Title style={[styles.title, {paddingLeft: 20}]}>
                    Direct Message
                </Title>
                <Button icon="email" mode="text" onPress={showModal}>
                    Send Message
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 10,
    },
    containerModal: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        textAlign: 'center',
    },
    textInput: {
        backgroundColor: 'white',
    },
    buttons: {
        marginTop: 10,
    },
});

export default InboxModal;
