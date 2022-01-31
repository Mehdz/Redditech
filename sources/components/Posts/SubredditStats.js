import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Divider, Title} from 'react-native-paper';
import PropTypes from 'prop-types';
import {MarkdownView} from 'react-native-markdown-view';
import ChipFilters from './Chip';

const SubredditStats = ({data}) => {
    return (
        <View>
            <Card style={styles.container}>
                <Card.Content>
                    <Title style={styles.text}>Bio</Title>
                    <View style={styles.text}>
                        <MarkdownView>
                            {data.description.split('\n')[0]}
                        </MarkdownView>
                    </View>
                </Card.Content>
            </Card>
            <View style={styles.containerChip}>
                <ChipFilters subreddit={data.url} />
            </View>
            <Divider />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    containerChip: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    text: {
        textAlign: 'center',
    },
});

SubredditStats.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SubredditStats;
