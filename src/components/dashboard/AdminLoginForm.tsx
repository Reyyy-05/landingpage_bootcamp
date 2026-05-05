"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const unauthorized = searchParams.get("error") === "unauthorized";

  // useActionState for React 19 / Next.js 15
  const [state, formAction, isPending] = useActionState(loginAdmin, null);

  return (
    <Card className="w-full max-w-sm shadow-xl border-gray-100">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Admin Panel
        </CardTitle>
        <CardDescription>
          Masukkan kredensial Anda untuk mengakses dashboard
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {unauthorized && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              Sesi Anda telah berakhir atau tidak valid. Silakan login kembali.
            </div>
          )}
          {state?.error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-in fade-in">
              <AlertCircle size={16} />
              {state.error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@creativemu.id"
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isPending}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
