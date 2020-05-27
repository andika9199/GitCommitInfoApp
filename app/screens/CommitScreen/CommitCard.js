import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {
  WHITE,
  GRAY_DARKER,
  GRAY_LIGHT,
  TEXT_LARGE_BOLD,
  DEFAULT_TEXT,
} from '../../configs/style';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
  },
  commitInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 2,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  wording: {...DEFAULT_TEXT},
  bgGray: {
    backgroundColor: GRAY_LIGHT,
  },
  bgWhite: {
    backgroundColor: WHITE,
  },
  wordingContainer: {flex: 1, paddingLeft: 4},
});

/**
 *
 * @param {string} message
 * @param {string} date
 * @param {string} authorAvatar
 * @param {string} authorName
 * @param {string} commiterAvatar
 * @param {string} commiterName
 * @param {number} index
 */

export default function CommitCard({props}) {
  const {
    message,
    date,
    authorAvatar,
    authorName,
    commiterAvatar,
    commiterName,
    index,
  } = props;

  // Sometimes Commit not have author so im just remove the data
  const isAuthorNotExist = !authorName || !authorAvatar ? true : false;
  const isAuthorSameWithCommitter = authorAvatar === commiterAvatar;
  const wording =
    (!isAuthorNotExist ? `${authorName} authored and ` : '') +
    `${commiterName} commited ${date}`;
  const color = index % 2 === 0 ? styles.bgGray : styles.bgWhite;
  return (
    <View style={[styles.container, color]}>
      <Text numberOfLines={1} style={TEXT_LARGE_BOLD}>
        {message}
      </Text>
      <View style={styles.commitInfoContainer}>
        <View style={styles.imageContainer}>
          {!isAuthorNotExist && !isAuthorSameWithCommitter && (
            <Image source={{uri: authorAvatar}} style={styles.image} />
          )}
          <Image source={{uri: commiterAvatar}} style={styles.image} />
        </View>
        <View style={styles.wordingContainer}>
          <Text style={styles.wording}>{wording}</Text>
        </View>
      </View>
    </View>
  );
}

CommitCard.propTypes = {
  message: PropTypes.string,
  date: PropTypes.string,
  authorAvatar: PropTypes.string,
  authorName: PropTypes.string,
  commiterAvatar: PropTypes.string,
  commiterName: PropTypes.string,
  index: PropTypes.number,
};
