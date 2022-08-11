import React from "react";
import { Text, StyleSheet } from "react-native";
import { Dialog } from '@rneui/themed';

type propTypes = {
    visible: boolean,
    toggleDialog: () => void,
    dialog: string,
    onDone: () => void,
    title: string,
}

const DialogComponent = ({visible, toggleDialog, dialog, onDone, title}: propTypes) => {
  return (
    // todo -> CUSTOMIZE THIS DIALOG COMPONENT ACCORDING TO THE DESIGN LATER ....

    <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
      <Dialog.Title title={title} />
      <Text style={styles.textStyle}>{dialog}</Text>
      <Dialog.Actions>
        <Dialog.Button
          title="Proceed"
          onPress={onDone}
        />
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogComponent;

const styles = StyleSheet.create({
    textStyle: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
    }
});
