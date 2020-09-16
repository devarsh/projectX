import {
  useRecoilTransactionObserver_UNSTABLE,
  useGotoRecoilSnapshot,
  Snapshot,
} from "recoil";
import React from "react";

export const TimeTravelObserver = () => {
  const [snapshots, setSnapshots] = React.useState<Snapshot[]>([]);
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    console.log(snapshot);
    setSnapshots([...snapshots, snapshot]);
  });

  const gotoSnapshot = useGotoRecoilSnapshot();

  return (
    <ol>
      {snapshots.map((snapshot, index) => (
        <li key={index}>
          Snapshot {index}
          <button onClick={() => gotoSnapshot(snapshot)}>Restore</button>
        </li>
      ))}
    </ol>
  );
};
