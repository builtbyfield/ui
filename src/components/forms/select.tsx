import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

const fruits: Readonly<Option[]> = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
];

type Fruit = (typeof fruits)[number]["value"];

// z.enum expects a non-empty array so to work around that
// we pull the first value out explicitly
const FRUITS: [Fruit, ...Fruit[]] = [
  fruits[0].value,
  // And then merge in the remaining values from `fruits`
  ...fruits.slice(1).map((p) => p.value),
];

const schema = z.object({
  fruit: z.nativeEnum(FRUITS, {
    errorMap: () => ({
      message: "Please select a fruit",
    }),
  }),
});

type Schema = z.infer<typeof schema>;

function SelectForm() {
  const [result, setResult] = useState<string>();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const processForm: SubmitHandler<Schema> = async (data) => {
    setResult(JSON.stringify(data));
    reset();
  };

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit(processForm)}>
        <Controller
          name="fruit"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div>
              <div className="text-xs">Favourite fruit</div>
              <Select
                {...field}
                key={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  {fruits.map((fruit) => (
                    <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fruit?.message && <span>{errors.fruit?.message}</span>}
            </div>
          )}
        />
        <Button type="submit" variant="default">
          Button
        </Button>
      </form>
      <pre className="text-sm">{result ?? "{}"}</pre>
    </div>
  );
}

export { SelectForm };
