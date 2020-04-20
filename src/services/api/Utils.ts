import loginStore from '../../store/LoginStore';

export const responseHandler = (response: any) => {
  if (response.ok) {
    let json = response.json();

    return json;
  } else {
    return response.text().then((text: string) => handleResponseText(response, text));
  }
}

const handleResponseText = (response: any, text: string) => {
  console.log(response.status);

  if (response.status === 401 && text.includes('UnauthorizedError')) {
    loginStore.setToken("");
  }
  throw text
}
