import styled from "styled-components";

const ItemWrapper = styled.div`
  margin: 8px;
  background: white;
  width: 100%;
`;

export const Item = ({ id, label }) => {
  return <ItemWrapper>{label}</ItemWrapper>;
};
