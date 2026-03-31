import { useForm, type SubmitHandler } from "react-hook-form";
import { FormField, Button, Input } from "@danalazar/metro-ui";

type FormValues = {
  name: string;
  password: string;
};

const FormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("am trimis", data);
  };

  return (
    <div className="w-full max-w-[540px] mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col gap-6">
      <h1>Formular cu validare</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          id="name"
          label="Name"
          error={errors.name?.message as string}
        >
          <Input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
        </FormField>

        <FormField
          id="password"
          label="Password"
          error={errors.password?.message as string}
        >
          <Input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Min 4 characters",
              },
            })}
          />
        </FormField>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FormPage;
