import React from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";

const categoryMachine = Machine({
  id: "fetch",
  initial: "edit",
  context: {
    items: [],
  },
  states: {
    edit: {
      on: {
        ADD_ITEM: {
          target: "edit",
          actions: assign({
            items: (ctx, e) => [...ctx.items, e.item],
          }),
        },
      },
    },
  },
});

export function Category() {
  const [current, send] = useMachine(categoryMachine);
  const [itemValue, setItemValue] = React.useState("");
  const { items } = current.context;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <ul>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (itemValue === "") return;
          send({ type: "ADD_ITEM", item: itemValue });
          setItemValue("");
        }}
      >
        <input
          value={itemValue}
          onChange={(e) => setItemValue(e.target.value)}
          id="itemName"
        />
        <button type="submit">Create new item</button>
      </form>
    </div>
  );
}
