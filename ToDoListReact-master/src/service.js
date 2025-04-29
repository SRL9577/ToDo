import axios from 'axios';

const apiUrl = "http://localhost:5213";

const service = {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/`);
    return result.data;
  },

  addTask: async (name) => {
    if (!name) {
      console.error('Task name is required!');
      return;
    }
    try{
      const response = await axios.post(`${apiUrl}/addItem`,{
        name,
        isComplete:false
      });
      console.log('Task added:', response.data);
      return response.data;
    }catch(error){
      console.error('Error adding task:', error);

    }
  },
 

  setCompleted: async (id, isComplete) => {
    try{
      const response = await axios.put(`${apiUrl}/updateItem/${id}`,{
        isComplete:isComplete
      });
      console.log('Task updated:', response.data);
      return response.data;
    }catch(error){
      console.error('Error updating task:', error);
    }
  },

  deleteTask: async (id) => {
    try{
      const response = await axios.delete(`${apiUrl}/deleteItem/${id}`);
      console.log('Task deleted:', response.data);
      return response.data;
    }
    catch(error){
      console.error('Error deleting task:', error);
    }
    }
};

export default service;