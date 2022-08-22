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
    <Dialog isVisible={visible} onBackdropPress={toggleDialog} style={styles.dialogBoxStyle}>
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
    dialogBoxStyle: {
      borderRadius: 10,
    },
    textStyle: {
        color: '#3A3F47',
        fontWeight: '300',
        fontSize: 14,
        lineHeight: 18,
    }
});
