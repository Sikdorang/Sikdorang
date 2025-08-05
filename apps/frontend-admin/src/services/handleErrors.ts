import { ERROR_MESSAGES } from '@/constants/messages';
import axios from 'axios';
import { toast } from 'react-toastify';

export const handelError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 500) {
      toast.error(ERROR_MESSAGES.serverError);
    } else {
      toast.error(ERROR_MESSAGES.unexpectedError);
    }
  }

  console.error(error);
};
