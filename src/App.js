import React from "react";
import "./App.css"
import List from "./data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {
  const list = List.list;
  return (
    <div className="App">
      <DragDropContext
          onDragEnd={(params) => {
          const srcIndex = params.source.index;
          const desIndex = params.destination.index;
          list.splice(desIndex, 0, list.splice(srcIndex, 1)[0]);
        }}
      >
        <div className="main-box">
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((item, i) => (
                  <Draggable
                    key={item.id}
                    draggableId={`draggable-${item.id}`}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="slide-boxes"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          border: snapshot.isDragging
                            ? "3px solid red"
                            : "3px solid gray",
                        }}
                      >
                        {item.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
