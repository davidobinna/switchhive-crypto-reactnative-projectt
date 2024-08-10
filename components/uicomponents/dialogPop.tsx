import React from 'react';
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface DialogProps {
  title: string;
  message: string;
  visibility: boolean;
  actionName: string;
  cancel: () => void;
  action: () => void;
}

const DialogPop: React.FC<DialogProps> = ({ title, message, visibility, actionName, cancel, action }) => {
  return (
    <Portal>
      <Dialog visible={visibility} onDismiss={cancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={action}>{actionName}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogPop;
