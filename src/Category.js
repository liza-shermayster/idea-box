import React from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { v4 as uuidv4 } from "uuid";

const categoryMachine = Machine({
  id: "fetch",
  initial: "edit",
  context: {
    items: {},
  },
  states: {
    edit: {
      on: {
        ADD_ITEM: {
          target: "edit",
          actions: assign({
            items: (ctx, e) => {
              const itemKey = uuidv4();
              const newItem = { _key: itemKey, value: e.item };
              const items = { ...ctx.items };
              items[itemKey] = newItem;
              return { ...items };
            },
          }),
        },
        DELETE_ITEM: {
          target: "edit",
          actions: assign({
            items: (ctx, e) => {
              const { itemKey } = e;
              const items = { ...ctx.items };
              delete items[itemKey];
              return items;
            },
          }),
        },
      },
    },
  },
});

export function Category() {
  const [current, send] = useMachine(categoryMachine);
  const { items } = current.context;
  console.log(items);
  return (
    <div>
      <ul>
        {Object.keys(items).map((itemKey) => (
          <li key={itemKey}>
            {items[itemKey].value}{" "}
            <button
              onClick={() => {
                send({ type: "DELETE_ITEM", itemKey });
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
      <AddItemForm
        onSubmit={(itemValue) => {
          send({ type: "ADD_ITEM", item: itemValue });
        }}
      />
    </div>
  );
}

function AddItemForm({ onSubmit }) {
  const [itemValue, setItemValue] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (itemValue === "") return;
        onSubmit(itemValue);
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
  );
}
