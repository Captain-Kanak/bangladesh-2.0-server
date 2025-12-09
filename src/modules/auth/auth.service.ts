const registerUser = async (payload: Record<string, unknown>) => {
  try {
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const authServices = {
  registerUser,
};
