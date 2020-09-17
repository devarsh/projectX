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
      render(1);
    }
  });

  const gotoSnapshot = useGotoRecoilSnapshot();

  const result: JSX.Element[] = [];
  let index = 0;
  for (let [key, value] of snapshots.current) {
    result.push(
      <li key={index}>
        Snapshot {key}
        <button onClick={() => gotoSnapshot(value)}>Restore</button>
      </li>
    );
    index++;
  }

  return <ol>{result}</ol>;
};
