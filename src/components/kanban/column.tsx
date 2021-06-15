import styled from "styled-components";
import { Item } from "./item";

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-weight: 500;
  padding: 8px;
  background: #6e3545;
  border-radius: 5px;
  width: 100%;
`;

export const Column = ({ id, label, items }) => {
  return (
    <ColumnWrapper>
      <Label>{label}</Label>
      {items.map((one) => (
        <Item key={one.id} {...one} />
      ))}
    </ColumnWrapper>
  );
};
