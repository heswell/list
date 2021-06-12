import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { KeySet } from "./keyset";

const byKey = ([k1], [k2]) => k1 - k2;

export function useVirtualization(data) {
  const viewport = useRef(null);
  const firstVisibleRowIdxRef = useRef(0);
  const viewportRowCountRef = useRef(1);
  const scrollPos = useRef(0);
  const rowHeight = useRef(0);
  const [contentHeight, setContentHeight] = useState(10000);
  const [rows, setRows] = useState([[0, 0, data[0]]]);
  const keys = useMemo(() => new KeySet({ from: 0, to: 1 }), []);

  useLayoutEffect(() => {
    const listItem = viewport.current.querySelector(".ListItem");
    const { height: viewportHeight } = viewport.current.getBoundingClientRect();
    const { height } = listItem.getBoundingClientRect();
    rowHeight.current = height;
    viewportRowCountRef.current = Math.ceil(viewportHeight / height);
    keys.reset({ from: 0, to: viewportRowCountRef.current });
    const from = 0;
    const to = viewportRowCountRef.current;
    const newRows = data
      .slice(from, to)
      .map((value, idx) => [
        keys.keyFor(idx + from),
        (idx + from) * height,
        value
      ])
      .sort(byKey);
    setRows(newRows);
    setContentHeight(height * data.length);
  }, [data, keys]);

  const handleVerticalScroll = useCallback(
    (e) => {
      const scrollTop = e.target.scrollTop;
      if (scrollTop !== scrollPos.current) {
        scrollPos.current = scrollTop;
        const firstRow = Math.floor(scrollTop / rowHeight.current);
        if (firstRow !== firstVisibleRowIdxRef.current) {
          firstVisibleRowIdxRef.current = firstRow;
          const from = firstRow;
          const to = firstRow + viewportRowCountRef.current;

          keys.reset({ from, to });
          const newRows = data
            .slice(from, to)
            .map((value, idx) => [
              keys.keyFor(idx + from),
              (idx + from) * rowHeight.current,
              value
            ])
            .sort(byKey);
          setRows(newRows);
        }
      }
    },
    [data, keys]
  );

  return [viewport, rows, contentHeight, handleVerticalScroll];
}
