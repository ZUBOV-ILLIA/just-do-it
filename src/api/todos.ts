import axios from "axios";

const API = import.meta.env.VITE_API;

export async function getTodos() {
  try {
    const res = await axios.get(`${API}/todos`);

    console.log(res);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addTodo(title: string) {
  try {
    const res = await axios.post(`${API}/todos`, { title });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodo({ id, title, completed }: TodoCardType) {
  try {
    const res = await axios.patch(`${API}/todos/${id}`, { title, completed });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodo(id: string) {
  try {
    const res = await axios.delete(`${API}/todos/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}
