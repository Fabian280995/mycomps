"use client";
import { Session } from "@/types";
import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import ExerciseCard from "./exercise-card";

interface Props {
  session: Session;
  index: number;
}

const SessionCard = ({ session, index }: Props) => {
  return (
    <Droppable key={session.id} droppableId={`droppable-${session.id}`}>
      {(provided) => (
        <div
          className="flex flex-col min-h-[60vh] gap-4 bg-white w-[420px] m-2 shadow-md rounded-md p-4"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="text-xl font-semibold text-gray-700">
            {session.name}
          </h2>
          {session.exercises.length ? (
            <div className="flex flex-col">
              {session.exercises.map((exercise, i) => (
                <ExerciseCard key={exercise.id} exercise={exercise} index={i} />
              ))}
            </div>
          ) : (
            <div className="w-full h-full justify-center items-center">
              <span className="text-xs text-gray-200 text-center">
                Keine Übungen vorhanden.
              </span>
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default SessionCard;
