import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from "react-native";
import { Note } from "./note";
import { TextInput } from "react-native";


type Props = {
  note: Note | null,
  open: boolean,
  onSaved: (note: Note) => void;
  onClose: () => void;
}

export function NoteModal({
  note,
  open,
  onSaved,
  onClose,
}: Props) {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSave = () => {
    if (!note) return;
    onSaved({
      ...note,
      title,
      text,
    });
  }

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setText(note.text);
    }
  }, [note]);




  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => onClose()}>

      <View style={styles.modal}>

        <Text style={styles.titulo}>Nota</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Titulo"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Texto"
          value={text}
          onChangeText={setText}
        />

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button2}
            onPress={handleSave}>
            <Text style={styles.buttonText2}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    top: 50
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
  modal: {
    marginTop: "50%",
    marginLeft: "2.5%",
    width: "95%",
    height: "30%",
    backgroundColor: "#C1E8FF",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "black"
  },

  textInput: {
    width: "90%",
    height: "15%",
    marginBottom: "5%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    marginLeft: "4%"
  },

  titulo: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: "5%",
    marginTop: "5%"
  },

  button: {
    width: "40%",
    backgroundColor: "#052659",
    height: "135%",
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    top: 4
  },

  button2: {
    width: "40%",
    backgroundColor: "#052659",
    height: "135%",
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText2: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    top: 4
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 30,

  }
});
