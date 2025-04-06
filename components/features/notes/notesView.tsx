import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from "react-native";
import { Note } from "./note";
import { DataSource } from "./dataSource";
import NotesCard from "./notesCard";
import { NoteModal } from "./noteModal";
import { supabase } from "../../../lib/supabaseNote";


export default function NotesView() {


  const dataSource = new DataSource();

  //const notes = ["Nota 1", "Nota 2", "Nota 3", "Nota 4", "Nota 5"];
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    try {
      const results = await dataSource.getNotes();
      setNotes(results);
    } catch (error: any) {
      Alert.alert(`Error al cargar notas: ${error.message}`);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);


  const handleAddNote = () => {
    setSelectedNote({ id: Date.now(), title: "", text: "", date: new Date() });
    setModalOpen(true);

  }

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  const onSaveNote = async (note: Note) => {
    if (!note.title.trim()) {
      Alert.alert("No se puede dejar vacío");
      return;
    }

    const isNew = note.id === -1;

    const { data, error } = await supabase
      .from("notes")
      .upsert([
        {
          id: isNew ? undefined : note.id,
          title: note.title,
          text: note.text,
          date: new Date(),
        },
      ])
      .select();

    if (error) {
      Alert.alert("Error al guardar la nota", error.message);
      return;
    }

    fetchNotes();

    setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddNote}
      >
        <Text style={styles.buttonText}>Añadir Nota</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <NotesCard note={item} onEdit={handleEditNote} />
        )}
      />

      <NoteModal
        open={modalOpen}
        note={selectedNote}
        onClose={() => setModalOpen(false)}
        onSaved={onSaveNote}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    top: 50,
    width: "50%",
    height: "50%"
  },


  button: {
    width: "100%",
    backgroundColor: "#052659",
    height: "5%",
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    top: 4
  }
});
