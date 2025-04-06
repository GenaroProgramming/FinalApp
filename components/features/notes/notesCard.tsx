import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from "react-native";
import { DataSource } from "./dataSource";
import { Note } from "./note";

type Props = {
  note: Note;
  onEdit: (note: Note) => void;
};

export default function NotesCard({ note, onEdit }: Props) {
  return (
      <TouchableOpacity onPress={() => onEdit(note)}>
          <View style={styles.item}>
              <Text style={styles.tittle}>{note.title}</Text>
              <Text style={styles.text}>{note.text}</Text>
              <View style={styles.dates}>
                <Text style={styles.fecha}>Fecha: </Text>
                <Text style={styles.date}>{new Date(note.date).toLocaleString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                })}</Text>
              </View>
              
          </View>
      </TouchableOpacity>
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
    backgroundColor: "#7DA0CA",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "black"
  },
  text: {
    fontSize: 18,

  },

  tittle:{
    fontSize: 23,
    fontWeight: "bold",
    bottom: 5
  },

  date: {
    fontSize: 16
  },

  dates:{
    flexDirection: "row",
    marginTop: "10%",
    marginBottom: -12
  },

  fecha:{
    fontSize: 16,
    fontWeight: "bold"
  }

});