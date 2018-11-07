import React from 'react';
import { Image, View, TouchableNativeFeedback } from 'react-native';
import {
  Text,
  Icon,
  Header,
  ButtonGroup,
  ListItem,
} from 'react-native-elements';
import { style, styles } from './TextItem.styles';
import { Vote } from '../../Vote/Vote';
import { getTimeAgo } from '../../../config/helpers';

export const TextItem = ({
  postId,
  score,
  text,
  timestamp,
  replyCount,
  clickHandler,
}) => {
  onPress = () => {
    console.log('Post Clicked');
    clickHandler(postId);
  };

  return (
    <TouchableNativeFeedback
      onPress={this._onPressButton}
      onPress={() => this.onPress()}
    >
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{text}</Text>
          </View>
          <View style={styles.voteContainer}>
            <Vote score={score} />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={style.bottomTextStyle}>{getTimeAgo(timestamp)}</Text>
          </View>
          <View>
            <Text style={style.bottomTextStyle}>
              {replyCount
                ? replyCount > 1
                  ? replyCount + ' replies'
                  : replyCount + ' reply'
                : null}
            </Text>
          </View>
          <View style={styles.extraContainer}>
            <Text style={style.bottomTextStyle} />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
