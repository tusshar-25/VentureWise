import { v4 as uuidv4 } from "uuid";
import { generateAccountNo } from "../Utils/GenerateAcc.js";
import { generatePinFromNameDob } from "../Utils/Normalize.js";

export const users = [
  {
    id: uuidv4(),
    accNo: generateAccountNo(),
    name: "Rahul Sharma",
    username: "rahul95",
    dob: "1995-08-15",
    pin: generatePinFromNameDob("Rahul Sharma", "1995-08-15"),
    balance: 1250000,
  },
  {
    id: uuidv4(),
    accNo: generateAccountNo(),
    name: "Sneha Verma",
    username: "sneha98",
    dob: "1998-01-20",
    pin: generatePinFromNameDob("Sneha Verma", "1998-01-20"),
    balance: 1250000,
  },
  {
    id: uuidv4(),
    accNo: generateAccountNo(),
    name: "Amit Singh",
    username: "amit88",
    dob: "1988-05-10",
    pin: generatePinFromNameDob("Amit Singh", "1988-05-10"),
    balance: 3378099,
  },
];
