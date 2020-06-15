import { dataPost } from '../../../services/api'
  
export let getFileData = async (form: HTMLFormElement) => {
  try {
      const response = await fetch('http://chat.fs.a-level.com.ua/upload', 
                      {
                        method: "POST",
                        headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
                        body: new FormData(form)
                      }  );
      const result = response.json();
      return response.ok ? result : new Error('Status is not 200')
  } catch (error) {
      return new Error('DataPost failed')
  }
}