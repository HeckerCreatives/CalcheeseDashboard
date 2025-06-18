import { useState } from "react";

type Item = {
  id: string;
  itemid: string;
  itemname: string;
  createdAt: string;
};

type MultiSelectProps = {
  data?: Item[];
  selectedIds: string[]; // <-- new prop
  onChange: (selectedIds: string[]) => void;
};

export default function MultiSelect({
  data = [],
  selectedIds,
  onChange,
}: MultiSelectProps) {
  const toggleSelection = (id: string) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter(itemId => itemId !== id)
      : [...selectedIds, id];
    onChange(updated);
  };


  return (
    <div className="border p-2 bg-white w-full rounded-md mt-1">
      <div className="mb-2 text-xs text-gray-600">Select Items:</div>
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
        {data.map(item => (
          <label
            key={item.id}
            className="flex items-center gap-2 cursor-pointer text-xs"
          >
            <input
              type="checkbox"
              value={item.id}
              checked={selectedIds?.includes(item.id)}
              onChange={() => toggleSelection(item.id)}
            />
            {item.itemname}
          </label>
        ))}
      </div>
    </div>
  );
}
