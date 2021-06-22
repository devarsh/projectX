import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 77vh;
  overflow-x: scroll;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  width: 250px;
  flex-grow: 1;
  background: rgb(209 213 218 / 29%);
  flex-shrink: 0;
`;

export const Heading = styled.div`
  padding: 8px;
  display: flex;
  align-items: baseline;
`;

export const ItemsContainer = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
`;

export const RoundedCount = styled.div`
  border-radius: 50%;
  padding: 4px;
  background: rgba(209, 213, 218, 0.5);
  padding: 0px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const ItemWrapper = styled.div`
  margin-top: 8px;
  background: white;
  border-radius: 5px;
  padding: 8px;
  padding-left: 32px;
  position: relative;
  min-height: 50px;
`;

export const ItemDragger = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`;

export const ItemRibbon = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: ${(props) => `1px solid ${props.color}`};
`;
