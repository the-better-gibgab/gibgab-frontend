import React from 'react';
import ReactNative, { TextInput, Platform, NativeModules } from 'react-native';
import { styles } from './LargeInput.styles';

const ANDROID_PLATFORM = Platform.OS === 'android';

const AutoGrowTextInputManager = NativeModules.AutoGrowTextInputManager;

export class LargeInput extends React.Component {
  constructor(props) {
    super(props);
    this.setNativeProps = this.setNativeProps.bind(this);
  }

  componentDidMount() {
    if (this.shouldApplyNativeSettings()) {
      const reactTag = this.textInputReactTag();
      if (reactTag) {
        AutoGrowTextInputManager.applySettingsForInput(reactTag, {
          enableScrollToCaret: this.props.enableScrollToCaret,
          maxHeight: this.props.maxHeight,
        });
      }
    }
  }

  componentWillUnmount() {
    if (this.shouldApplyNativeSettings()) {
      const reactTag = this.textInputReactTag();
      if (reactTag) {
        AutoGrowTextInputManager.performCleanupForInput(reactTag);
      }
    }
  }

  shouldApplyNativeSettings() {
    return (
      AutoGrowTextInputManager &&
      (ANDROID_PLATFORM || this.props.enableScrollToCaret)
    );
  }

  textInputReactTag() {
    if (this._textInput) {
      return ReactNative.findNodeHandle(this._textInput);
    }
  }

  render() {
    return (
      <TextInput
        multiline
        {...this.props}
        {...this.style}
        underlineColorAndroid="transparent"
        style={[this.props.style, { height: 'auto' }, styles.inputContainer]}
        ref={r => {
          this._textInput = r;
        }}
      />
    );
  }

  setNativeProps(nativeProps = {}) {
    this._textInput.setNativeProps(nativeProps);
  }

  resetHeightToMin() {
    this.setNativeProps({ text: '' });
  }

  clear() {
    if (ANDROID_PLATFORM) {
      // fix for predictive text issues can be removed once https://github.com/facebook/react-native/pull/12462 is merged
      AutoGrowTextInputManager.resetKeyboardInput(
        ReactNative.findNodeHandle(this._textInput)
      );
    }
    return this._textInput.clear();
  }

  focus() {
    return this._textInput.focus();
  }

  blur() {
    this._textInput.blur();
  }

  isFocused() {
    return this._textInput.isFocused();
  }

  getRef() {
    return this._textInput;
  }
}
