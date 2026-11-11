import axios from "axios";

// JSON Server runs here (see backend folder)
const BASE_URL = "http://localhost:5000/bills";

// GET  all bills
export const getAllBills = () => axios.get(BASE_URL);

// GET  one bill by id
export const getBillById = (id) => axios.get(`${BASE_URL}/${id}`);

// POST a new bill
export const saveBill = (bill) => axios.post(BASE_URL, bill);

// DELETE a bill by id
export const deleteBill = (id) => axios.delete(`${BASE_URL}/${id}`);
