import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Confirmation } from "@/helpers/confirmation";
import { AlertComponents } from "@/components/global/AlertComponents";
import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router";

export const LoginForm = ({ onSwitch }) => {
  const formSchema = z.object({
    email: z.email({ message: "Email atau password salah." }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
  });

  const { signIn, loginData, loading, setLoginData } = useAuth();
  const [alertConfig, setAlertConfig] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const { openConfirm } = Confirmation({ setAlertConfig, setOpenAlert });
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    if (values) {
      try {
        const res = await signIn(values);
        if (res?.success) {
          openConfirm({
            title: "Berhasil",
            icon: <CircleCheckBig size={"130"} color="#04ff00" />,
            desc: "Berhasil melakukan login",
            actionLabel: "Lanjut",
            cancelLabel: null,
            variant: "confirm",
            onConfirm: () => navigate('/genre'),
          });
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="w-full flex flex-col gap-5 py-10">
          <div className="mt-5">
            <h3 className="font-bold text-center text-white text-3xl">Hello</h3>
            <p className="font-normal text-center text-gray-300">
              Sign into your account
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 text-white px-5 my-8"
          >
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
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-5">
              <Button
                className={
                  "bg-teal-400 hover:bg-teal-300 font-bold text-base hover:cursor-pointer"
                }
                type={"submit"}
              >
                Login
              </Button>
              <div className="flex gap-3 justify-center items-center text-sm font-normal">
                <p>Don't have an account? </p>
                <Button
                  type={"button"}
                  click={onSwitch}
                  variant={"primary"}
                  className="text-white hover:underline"
                >
                  Click here
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Form>
      {alertConfig && (
        <AlertComponents
          title={alertConfig.title}
          icon={alertConfig.icon}
          desc={alertConfig.desc}
          actionLabel={alertConfig.actionLabel}
          cancelLabel={alertConfig.cancelLabel}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          isLoading={loading}
          onCancel={() => setOpenAlert(false)}
          onConfirm={async () => {
            if (!alertConfig.onConfirm) return setOpenAlert(false);
            try {
              await alertConfig.onConfirm(); // jalankan aksi yang dikonfirmasi
            } catch (err) {
              // Jika aksi gagal, tampilkan error alert
              setOpenAlert(false);
              openError(err?.message || "Operasi gagal dijalankan.");
            }
          }}
          variant={alertConfig.variant}
        />
      )}
    </>
  );
};
