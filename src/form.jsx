import { useForm } from "react-hook-form";

export default function SubmitForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("roll")} />

        <input {...register("exampleRequired", { required: true })} />

        {errors.exampleRequired && <span>This field is required</span>}

        <select {...register("year")}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>

        <select
          className="bg-gray-300 px-4 py-2 rounded-md"
          {...register("type")}
        >
          <option value="Vocational">Vocational</option>
          <option value="Regular">Regular</option>
          <option value="Annual">Annual</option>
        </select>

        <select
          className="bg-gray-300 px-4 py-2 rounded-md"
          {...register("part")}
        >
          <option value="PART-I">PART-I</option>
          <option value="PART-II">PART-II</option>
          <option value="PART-III">PART-III</option>
        </select>

        <input type="submit" />
      </form>
    </div>
  );
}
