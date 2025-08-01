

// ? Creamos la interfaz de respuesta de la autenticación exitosa
export interface AuthResponse {
  token: string;
  isSuccess: true;
  message: string;
}

