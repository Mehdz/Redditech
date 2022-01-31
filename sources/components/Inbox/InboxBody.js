import React from 'react';
import {Divider, Card, Avatar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {MarkdownView} from 'react-native-markdown-view';
import PropTypes from 'prop-types';

const LeftContent = props => <Avatar.Icon {...props} icon="email" />;

const InboxBody = props => (
    <>
        <Card style={styles.container}>
            <Card.Title
                title={props.title}
                subtitle={props.author}
                left={LeftContent}
            />
            <Card.Content>
                <MarkdownView>{props.content}</MarkdownView>
            </Card.Content>
        </Card>
        <Divider />
    </>
);

const styles = StyleSheet.create({
    container: {
        paddingBottom: 15,
    },
});

InboxBody.propTypes = {
    navigation: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default InboxBody;
