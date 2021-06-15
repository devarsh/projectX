import styled from "styled-components";
import { Column } from "./column";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Board = ({ data }) => {
  return (
    <BoardContainer>
      {data.map((one) => (
        <Column key={one.id} {...one} />
      ))}
    </BoardContainer>
  );
};
