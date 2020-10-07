import {
  useRecoilTransactionObserver_UNSTABLE,
  useGotoRecoilSnapshot,
  Snapshot,
  SnapshotID,
} from "recoil";
import React from "react";

export const TimeTravelObserver = () => {
  const snapshots = React.useRef(new Map<SnapshotID, Snapshot>());
  const [, render] = React.useState(0);
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    if (!snapshots.current.has(snapshot.getID())) {
      snapshots.current.set(snapshot.getID(), snapshot);
      render((old) => old + 1);
    }
  });

  const gotoSnapshot = useGotoRecoilSnapshot();

  const result: JSX.Element[] = [];
  let index = 0;
  let keys: number[] = [];
  for (let [key, value] of snapshots.current) {
    keys[index] = Number(key);
    result.push(
      <li key={index} style={{ display: "inline-block" }}>
        <button onClick={() => gotoSnapshot(value)}>{`Restore ${key}`}</button>
      </li>
    );
    index++;
  }

  return (
    <React.Fragment>
      <div style={{ overflow: "scroll" }}>
        <ul style={{ width: "7000px" }}>{result}</ul>
      </div>
    </React.Fragment>
  );
};
