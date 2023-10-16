"use client";
import { Session } from "@/types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import SessionCard from "./session-card";
import { useState } from "react";

interface Props {
  sessions: Session[] | null;
  programId: string;
}

const SessionsBoard = ({ sessions }: Props) => {
  const [sessionData, setSessionData] = useState<Session[] | null>(sessions);
  const handleDragEnd = (e: DropResult) => {
    /* 
    const { source, destination } = e;
    if (!destination || !sessions) return;
    if (source.droppableId === destination?.droppableId) {
      const newSessions = [...sessions];
      const sessionId = source.droppableId.split("-")[1];
      console.log(sessionId);
      const exerciseId = newSessions[+sessionId].exercises[source.index].id;
    } */
  };
  return sessionData?.length ? (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex min-w-max">
        {sessionData.map((session, i) => (
          <SessionCard key={session.id} session={session} index={i} />
        ))}
      </div>
    </DragDropContext>
  ) : (
    <div className="flex w-full h-full items-center justify-center">
      <p className="font-semibold text-sm text-gray-300">
        Du hast noch keine Trainingseinheiten erstellt!
      </p>
    </div>
  );
};

export default SessionsBoard;
