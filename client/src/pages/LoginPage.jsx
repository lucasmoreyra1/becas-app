import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, errors: signInErrors } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Realiza el inicio de sesión
      const result = await signIn(data);

      if (result?.success) {
        navigate("/ver-tramites");
      } else {
        console.error(
          "Error en el inicio de sesión:",
          result?.message || signInErrors
        );
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Iniciar Sesión
        </h2>
        {signInErrors && (
          <p className="text-red-500 text-center mb-4">{signInErrors.error}</p>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              {...register("email", { required: "El correo es obligatorio" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Correo electrónico"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
