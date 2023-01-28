import { SelectForm } from "@/components/forms/select";

function App() {
  return (
    <div className="flex p-8 flex-col items-center min-h-screen w-full justify-center">
      <div className="w-full max-w-md p-4 rounded-xl bg-neutral-100">
        <SelectForm />
      </div>
    </div>
  );
}

export default App;
