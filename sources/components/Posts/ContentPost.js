import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Caption, Card} from 'react-native-paper';
import {MarkdownView} from 'react-native-markdown-view';
import ContentDetails from './ContentDetails';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const SetThumbnail = data => {
    if (
        (data.url && data.url.includes('.jpg')) ||
        (data.url && data.url.includes('.png'))
    ) {
        return <Card.Cover style={styles.banner} source={{uri: data.url}} />;
    } else if (data.thumbnail && data.thumbnail.includes('https://')) {
        return (
            <Card.Cover style={styles.banner} source={{uri: data.thumbnail}} />
        );
    }
    return null;
};

const ContentPost = props => {
    const {isLogged} = useSelector(state => state.authReducer);
    const LeftContent = props => <Avatar.Icon {...props} icon="reddit" />;

    return (
        <Card style={styles.containerCard}>
            <Card.Title
                title={props.data.subreddit_name_prefixed}
                subtitle={props.data.description}
                left={LeftContent}
            />
            <SetThumbnail
                url={props.data.url}
                thumbnail={props.data.thumbnail}
            />
            <Card.Title title={props.data.title || props.data.body} />
            <Card.Content>
                <MarkdownView>
                    {props.data.selftext || props.data.url}
                </MarkdownView>
                <Caption>{props.data.subreddit_name_prefixed}</Caption>
                <ContentDetails data={props.data} isLogged={isLogged} />
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    containerCard: {
        marginBottom: 10,
    },
    banner: {
        resizeMode: 'contain',
    },
    link: {
        color: 'red',
    },
});

ContentPost.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ContentPost;
