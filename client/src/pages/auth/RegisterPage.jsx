import RegisterForm from "../../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Sign Up
        </h1>

        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;