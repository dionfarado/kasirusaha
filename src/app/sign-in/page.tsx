"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { useAuthStore } from "../../stores/useAuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Field, Form, Formik } from "formik";
import { LoginFormData } from "@/lib/validation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((s) => s.setAuth);
  const InitialValues = { email: "", password: "" };

  const handlesubmit = async (values: LoginFormData) => {
    console.log(values);
    try {
      const res = await api.post("/auth/sign-in/email", values);
      // asumsi response { token, user }
      localStorage.setItem("accesstoken", res.data.token);
      router.push("/select-company");
      console.log(res);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-6">
        {/* Icon Lingkaran */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/80">
            {/* ganti dengan ikon sesuai kebutuhan */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>

        {/* Judul */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Selamat datang kembali
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Masuk untuk mengakses akun Anda
          </p>
        </div>

        {/* Card Login */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <button
            type="button"
            className="mb-4 flex w-4/7 px-1 items-center justify-row gap-2 rounded-md border border-blue-600 bg-blue-600 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-500"
          >
            <Image src="/google.png" width={30} height={20} alt="" />
            Masuk dengan Google
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">atau</span>
            </div>
          </div>
          <Formik initialValues={InitialValues} onSubmit={handlesubmit}>
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field type="email" name="email" className="" />
                {/* <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                /> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kata Sandi
                </label>
                <Field type="password" name="password" className="" />
                {/* <input
                  type="password"
                  placeholder="Masukkan kata sandi Anda"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                /> */}
                <div className="mt-1 text-right">
                  <a
                    href="#"
                    className="text-xs text-indigo-600 hover:underline"
                  >
                    Lupa kata sandi?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-gray-900 py-2 text-white hover:bg-gray-800"
              >
                Masuk
              </button>
            </Form>
          </Formik>
          <p className="mt-4 text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
