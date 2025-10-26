import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const RegistrationForm = ({onSwitch}) => {
  const formSchema = z.object({
    username: z.string().min(5, {message: "Username minimal 5 karakter dan unique"}),
    email: z.email({ message: "Email harus unique." }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    confirm_password: z.string()
  }).refine((data) => data.password === data.confirm_password, {
    message: "Konfirmasi password, password tidak cocok",
    path: ["confirm_password"]
  })

  const {signUp} = useAuth()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values) => {
    if(values) {
      try {
        const {username, email, password} = values
        const data = {username, email, password}
        const res = await signUp(data)
        if(res?.success) {
          toast.success()
          navigate('/genre')
        }
        return res
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <Form {...form}>
        <div className="w-full flex flex-col gap-5 py-10">
          <div className="mt-5">
            <h3 className="font-bold text-center text-white text-3xl">
              Create Account
            </h3>
            <p className="font-normal text-center text-gray-300">
              Join us today with register your account
            </p>
          </div>
          <form action="" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 text-white px-5 my-8">
            <FormField
              control={form.control}
              name={"username"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="after:ml-0.5 after:text-red-500 after:content-['*'] ...">
                      Username
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={
                        "border-2 placeholder:text-white focus-visible:border-teal-300 focus-visible:ring-teal-300/50 focus-visible:ring-[3px]"
                      }
                      placeholder={"Username"}
                      type={"text"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className={"text-white/80"}>
                    Silahkan buat username anda
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="after:ml-0.5 after:text-red-500 after:content-['*'] ...">
                      Email
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={
                        "border-2 placeholder:text-white focus-visible:border-teal-300 focus-visible:ring-teal-300/50 focus-visible:ring-[3px]"
                      }
                      placeholder={"ex. email@example.com"}
                      type={"email"}
                      {...field}

                    />
                  </FormControl>
                  <FormDescription className={"text-white/80"}>
                    Silahkan masukkan email google anda
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="after:ml-0.5 after:text-red-500 after:content-['*'] ...">
                      Password
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={
                        "border-2 placeholder:text-white focus-visible:border-teal-300 focus-visible:ring-teal-300/50 focus-visible:ring-[3px]"
                      }
                      placeholder={"ex. Zex-Rex123#@"}
                      type={"password"}
                      {...field}

                    />
                  </FormControl>
                  <FormDescription className={"text-white/80"}>
                    Masukkan password email anda
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"confirm_password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="after:ml-0.5 after:text-red-500 after:content-['*'] ...">
                      Confirm Password
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={
                        "border-2 placeholder:text-white focus-visible:border-teal-300 focus-visible:ring-teal-300/50 focus-visible:ring-[3px]"
                      }
                      placeholder={"ex. Zex-Rex123#@"}
                      type={"password"}
                      {...field}

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-5">
              <Button type={"submit"} className="bg-teal-400 hover:bg-teal-300 font-bold text-base mt-5">
                Register
              </Button>

              <p className="text-sm flex gap-3 justify-center items-center">
                Already have an account?{" "}
                <Button
                  type={"button"}
                  onClick={onSwitch}
                  variant={"primary"}
                  className="text-white hover:underline"
                >
                  Login here
                </Button>
              </p>
            </div>
          </form>
        </div>
      </Form>
    </>
  );
};
