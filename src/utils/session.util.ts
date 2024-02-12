import { v4 as uuidv4 } from 'uuid';

export const leadId = uuidv4;

export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};
