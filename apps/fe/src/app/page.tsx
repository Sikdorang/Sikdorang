import LoginForm from '@/components/pages/login/LoginForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="flex items-center justify-center h-full flex-1 wrapper w-full">
        <LoginForm />
      </div>
    </div>
  );
}
