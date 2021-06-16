import styled from "styled-components";
import { Column } from "./column";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Board = ({ data }) => {
  throw new Error("oops");
  return (
    <BoardContainer>
      {data.map((one) => (
        <Column key={one.id} {...one} />
      ))}
    </BoardContainer>
  );
};
