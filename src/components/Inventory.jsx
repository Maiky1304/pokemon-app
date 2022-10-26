import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearInventory } from "../reducers/inventorySlice";
import "./Inventory.css";
import Entity from "./inventory/Entity";

const Inventory = () => {
  const inventory = useSelector((state) => state.inventory.value);
  const dispatch = useDispatch();

  function handleInventoryClear() {
    if (inventory.length === 0) return;

    dispatch(clearInventory());
  }

  return (
    <section id="inventory" className="inventory">
      <div>
        <header className="inventory--header">
          <h2 className="inventory--header--h2">
            You've caught these pokémon!
          </h2>
        </header>
        <main className="inventory--entities">
          {inventory.map((set, index) => (
            <Entity key={index} url={set.url} />
          ))}
        </main>
      </div>

      <footer className="inventory--footer">
        <button
          className="inventory-footer--ci-btn"
          onClick={handleInventoryClear}
        >
          Clear Inventory
        </button>
      </footer>
    </section>
  );
};

export default Inventory;
