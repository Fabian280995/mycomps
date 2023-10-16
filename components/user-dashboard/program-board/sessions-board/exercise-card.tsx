"use client";
import { Exercise, SessionExercise } from "@/types";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  exercise: SessionExercise;
  index: number;
}

const ExerciseCard = ({ exercise, index }: Props) => {
  return (
    <Draggable
      key={exercise.id}
      draggableId={`draggable-${exercise.id}`}
      index={index}
    >
      {(provided) => (
        <div
          className="p-4 rounded-xl shadow-md bg-teal-50 m-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {exercise.exerciseData?.name
            ? exercise.exerciseData.name
            : `Übung ${index}`}
        </div>
      )}
    </Draggable>
  );
};

export default ExerciseCard;
