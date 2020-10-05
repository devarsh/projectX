import {
  useRecoilTransactionObserver_UNSTABLE,
  useGotoRecoilSnapshot,
  Snapshot,
  SnapshotID,
} from "recoil";
import React from "react";
import Slider from "@material-ui/core/Slider";

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
      <li key={index}>
        Snapshot {key}
        <button onClick={() => gotoSnapshot(value)}>Restore</button>
      </li>
    );
    index++;
  }

  return (
    <React.Fragment>
      <ol>{result}</ol>
      <Slider value={keys} style={{ minWidth: "100px" }} />
    </React.Fragment>
  );
};
