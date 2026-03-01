import {styled} from '@mui/material'
import {Link as LinkComponents} from "react-router-dom"
import { grayColor } from '../../constants/color';

export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1
})

export const Link = styled(LinkComponents)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover: {
    background-color: #f0f0f0;
  }
`;

export  const InputBox = styled("input")`
  width: 100%;
  height: 80%;
  border: 0.2px solid lightgray;
  outline: none;
  padding: 0rem 2rem;
  font-size: "18px";
  margin: 0.4rem 0.4rem;
  border-radius: 1.5rem;
  background-color: ${grayColor}

`

export const SearchField = styled("input")`
  padding: 0.8rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1rem;
  background-color: #f1f1f1;
  font-size: 1.1rem;
`

export const Buttons = styled("button")`
  padding: 0.7rem 1.6rem;
  border: none;
  outline: none;
  border-radius: 0.4rem;
  background-color: MarkText;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  font-size: 1rem;
`;